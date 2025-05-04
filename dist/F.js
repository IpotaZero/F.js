"use strict";
class F {
    set;
    constructor(list) {
        this.set = new Set(list);
    }
    phi(m) {
        console.assert(Number.isSafeInteger(m));
        const A = Array.from(this.set).sort((a, b) => a - b);
        for (const n of A) {
            if (m >= n) {
                m += 1;
            }
        }
        return m;
    }
    liftUp(B) {
        return new F(Array.from(B.set).map(this.phi.bind(this)));
    }
    insertTo(B) {
        return this.liftUp(B).union(this);
    }
    union(B) {
        return new F(this.set.union(B.set));
    }
    equals(B) {
        if (this.set.size != B.set.size)
            return false;
        for (const n of this.set) {
            if (!B.set.has(n)) {
                return false;
            }
        }
        return true;
    }
}
