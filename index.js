// 1,3,4,6,7
            // 5
            const cur = [1,3,4,5,6,7];
            
            let l = 0, r = cur.length - 1;
            while(l < r) {
                const mid = Math.floor((l + r) / 2);
                if(cur[mid] > 5) {
                    r = mid;
                }
                if(cur[mid] < 5) {
                    l = mid + 1;
                }
                if(cur[mid] === 5) {
                    r = mid; 
                }
            }
            cur.splice(l,0,5)
            console.log(l,r,cur)
            