// n1 旧节点 n2 新节点
// 通过比较新旧节点的差异，更新真实 DOM
const patchElement = (
    n1,
    n2,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized,
) => {
    // 1. 获取元素的真实 DOM
    const el = (n2.el = n1.el)

    let { patchFlag, dynamicChildren } = n2
    patchFlag |= n1.patchFlag & PatchFlags.FULL_PROPS
    // 获取新旧节点的 props
    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ

    if (dynamicChildren) {
        patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            el,
            parentComponent,
            parentSuspense,
            resolveChildrenNamespace(n2, namespace),
            slotScopeIds,
        )
    } else if (!optimized) {
        // full diff
        patchChildren(
            n1,
            n2,
            el,
            null,
            parentComponent,
            parentSuspense,
            resolveChildrenNamespace(n2, namespace),
            slotScopeIds,
            false,
        )
    }

    // 更新元素的属性
    if (patchFlag > 0) {
        // 包含动态属性
        if (patchFlag & PatchFlags.FULL_PROPS) {
            patchProps(el, oldProps, newProps, parentComponent, namespace)
        } else {
            // 属性是calss
            if (patchFlag & PatchFlags.CLASS) {
                if (oldProps.class !== newProps.class) {
                    hostPatchProp(el, 'class', null, newProps.class, namespace)
                }
            }
            // 属性是style
            if (patchFlag & PatchFlags.STYLE) {
                hostPatchProp(el, 'style', oldProps.style, newProps.style, namespace)
            }
            // 属性是props
            if (patchFlag & PatchFlags.PROPS) {
                // if the flag is present then dynamicProps must be non-null
                const propsToUpdate = n2.dynamicProps
                for (let i = 0; i < propsToUpdate.length; i++) {
                    const key = propsToUpdate[i]
                    const prev = oldProps[key]
                    const next = newProps[key]
                    // #1471 force patch value
                    if (next !== prev || key === 'value') {
                        hostPatchProp(el, key, prev, next, namespace, parentComponent)
                    }
                }
            }
        }
        // text
        // 属性是动态文本
        if (patchFlag & PatchFlags.TEXT) {
            if (n1.children !== n2.children) {
                hostSetElementText(el, n2.children)
            }
        }
    } else if (!optimized && dynamicChildren == null) {
        patchProps(el, oldProps, newProps, parentComponent, namespace)
    }
}

const patchChildren = (
    n1,
    n2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized = false,
) => {
    const c1 = n1 && n1.children
    const c2 = n2.children
    const { patchFlag } = n2

    if (patchFlag > 0) {
        if (patchFlag & PatchFlags.KEYED_FRAGMENT) {
            // 比较两个有key的子节点
            patchKeyedChildren(
                c1,
                c2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized,
            )
            return
        } else if (patchFlag & PatchFlags.UNKEYED_FRAGMENT) {
            // 比较两个没有key的子节点
            patchUnkeyedChildren(
                c1,
                c2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized,
            )
            return
        }
    }
}

// diff算法核心，对比同级子节点
const patchKeyedChildren = (
    c1,
    c2,
    container,
    parentAnchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized,
) => {
    let i = 0
    const l2 = c2.length
    let e1 = c1.length - 1 // prev ending index
    let e2 = l2 - 1 // next ending index

    // 1. sync from start
    // (a b) c
    // (a b) d e
    // 从头开始比较，直到遇到不同的节点为止
    while (i <= e1 && i <= e2) {
        const n1 = c1[i]
        const n2 = (c2[i] = optimized
            ? cloneIfMounted(c2[i])
            : normalizeVNode(c2[i]))
        if (isSameVNodeType(n1, n2)) {
            patch(
                n1,
                n2,
                container,
                null,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized,
            )
        } else {
            break
        }
        i++
    }

    // 2. sync from end
    // a (b c)
    // d e (b c)
    // 从尾部开始比较，直到遇到不同的节点为止
    while (i <= e1 && i <= e2) {
        const n1 = c1[e1]
        const n2 = (c2[e2] = optimized
            ? cloneIfMounted(c2[e2])
            : normalizeVNode(c2[e2]))
        if (isSameVNodeType(n1, n2)) {
            patch(
                n1,
                n2,
                container,
                null,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized,
            )
        } else {
            break
        }
        e1--
        e2--
    }

    // 3. common sequence + mount
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0
    // 旧节点处理完了，新节点还有剩余，更新节点
    if (i > e1) {
        if (i <= e2) {
            const nextPos = e2 + 1
            const anchor = nextPos < l2 ? (c2[nextPos]).el : parentAnchor
            while (i <= e2) {
                patch(
                    null,
                    (c2[i] = optimized
                        ? cloneIfMounted(c2[i])
                        : normalizeVNode(c2[i])),
                    container,
                    anchor,
                    parentComponent,
                    parentSuspense,
                    namespace,
                    slotScopeIds,
                    optimized,
                )
                i++
            }
        }
    }

    // 4. common sequence + unmount
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1
    // 新节点处理完了，旧节点还有剩余，更新节点
    else if (i > e2) {
        while (i <= e1) {
            unmount(c1[i], parentComponent, parentSuspense, true)
            i++
        }
    }

    // 5. unknown sequence
    // [i ... e1 + 1]: a b [c d e] f g
    // [i ... e2 + 1]: a b [e d c h] f g
    // i = 2, e1 = 4, e2 = 5
    // 剩下的节点是乱序的，处理剩下的节点
    // 核心是使用了最长递增子序列算法，减少节点的移动次数，提高性能
    else {
        const s1 = i // prev starting index
        const s2 = i // next starting index

        // 5.1 build key:index map for newChildren
        const keyToNewIndexMap = new Map()
        for (i = s2; i <= e2; i++) {
            const nextChild = (c2[i] = optimized
                ? cloneIfMounted(c2[i])
                : normalizeVNode(c2[i]))
            if (nextChild.key != null) {
                if (__DEV__ && keyToNewIndexMap.has(nextChild.key)) {
                    warn(
                        `Duplicate keys found during update:`,
                        JSON.stringify(nextChild.key),
                        `Make sure keys are unique.`,
                    )
                }
                keyToNewIndexMap.set(nextChild.key, i)
            }
        }

        // 5.2 loop through old children left to be patched and try to patch
        // matching nodes & remove nodes that are no longer present
        let j
        let patched = 0
        const toBePatched = e2 - s2 + 1
        let moved = false
        // used to track whether any node has moved
        let maxNewIndexSoFar = 0
        // works as Map<newIndex, oldIndex>
        // Note that oldIndex is offset by +1
        // and oldIndex = 0 is a special value indicating the new node has
        // no corresponding old node.
        // used for determining longest stable subsequence
        const newIndexToOldIndexMap = new Array(toBePatched)
        for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0

        for (i = s1; i <= e1; i++) {
            const prevChild = c1[i]
            if (patched >= toBePatched) {
                // all new children have been patched so this can only be a removal
                unmount(prevChild, parentComponent, parentSuspense, true)
                continue
            }
            let newIndex
            if (prevChild.key != null) {
                newIndex = keyToNewIndexMap.get(prevChild.key)
            } else {
                // key-less node, try to locate a key-less node of the same type
                for (j = s2; j <= e2; j++) {
                    if (
                        newIndexToOldIndexMap[j - s2] === 0 &&
                        isSameVNodeType(prevChild, c2[j])
                    ) {
                        newIndex = j
                        break
                    }
                }
            }
            if (newIndex === undefined) {
                unmount(prevChild, parentComponent, parentSuspense, true)
            } else {
                newIndexToOldIndexMap[newIndex - s2] = i + 1
                if (newIndex >= maxNewIndexSoFar) {
                    maxNewIndexSoFar = newIndex
                } else {
                    moved = true
                }
                patch(
                    prevChild,
                    c2[newIndex],
                    container,
                    null,
                    parentComponent,
                    parentSuspense,
                    namespace,
                    slotScopeIds,
                    optimized,
                )
                patched++
            }
        }

        // 5.3 move and mount
        // generate longest stable subsequence only when nodes have moved
        const increasingNewIndexSequence = moved
            ? getSequence(newIndexToOldIndexMap)
            : EMPTY_ARR
        j = increasingNewIndexSequence.length - 1
        // looping backwards so that we can use last patched node as anchor
        for (i = toBePatched - 1; i >= 0; i--) {
            const nextIndex = s2 + i
            const nextChild = c2[nextIndex]
            const anchor =
                nextIndex + 1 < l2 ? (c2[nextIndex + 1]).el : parentAnchor
            if (newIndexToOldIndexMap[i] === 0) {
                // mount new
                patch(
                    null,
                    nextChild,
                    container,
                    anchor,
                    parentComponent,
                    parentSuspense,
                    namespace,
                    slotScopeIds,
                    optimized,
                )
            } else if (moved) {
                // move if:
                // There is no stable subsequence (e.g. a reverse)
                // OR current node is not among the stable sequence
                if (j < 0 || i !== increasingNewIndexSequence[j]) {
                    move(nextChild, container, anchor, MoveType.REORDER)
                } else {
                    j--
                }
            }
        }
    }
}

// 更新具体的子节点
const patch = (oldNode, newNode) => {
    // 如果新旧节点都不存在，直接返回
    if (!oldNode && !newNode) return;

    // 如果新节点是文本，直接更新文本内容
    if (typeof newNode === 'string') {
        if (oldNode.nodeType === Node.TEXT_NODE) {
            oldNode.textContent = newNode;
        }
        return;
    }

    // 如果新节点是数组，遍历更新子节点
    if (Array.isArray(newNode)) {
        newNode.forEach((node, index) => {
            patch(oldNode.childNodes[index], node);
        });
        return;
    }

    // 如果新节点是一个对象（VNode），更新属性和子节点
    if (typeof newNode === 'object') {
        if (oldNode.nodeType !== Node.ELEMENT_NODE || oldNode.tagName.toLowerCase() !== newNode.tag) {
            // 如果旧节点不是相应的元素或者标签名不匹配，则直接替换
            const newElement = document.createElement(newNode.tag);
            // 更新属性...
            if (newNode.attrs) {
                // 更新属性逻辑
            }
            // 添加子节点...
            if (newNode.children) {
                newNode.children.forEach(child => {
                    newElement.appendChild(child);
                });
            }
            oldNode.parentNode.replaceChild(newElement, oldNode);
        } else {
            // 更新属性...
            if (newNode.attrs) {
                // 更新属性逻辑
            }
            // 更新子节点...
            if (newNode.children) {
                newNode.children.forEach((child, index) => {
                    patch(oldNode.childNodes[index], child);
                });
            }
        }
    }
}
