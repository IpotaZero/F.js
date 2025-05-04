class F {
    readonly set: Set<number>

    constructor(list: Iterable<number>) {
        this.set = new Set(list)
    }

    phi(m: number): number {
        console.assert(Number.isSafeInteger(m))

        const A = Array.from(this.set).sort((a, b) => a - b)

        for (const n of A) {
            if (m >= n) {
                m += 1
            }
        }

        return m
    }

    liftUp(B: F): F {
        return new F(Array.from(B.set).map(this.phi.bind(this)))
    }

    insertTo(B: F): F {
        return this.liftUp(B).union(this)
    }

    union(B: F): F {
        return new F(this.set.union(B.set))
    }

    equals(B: F): boolean {
        if (this.set.size != B.set.size) return false

        for (const n of this.set) {
            if (!B.set.has(n)) {
                return false
            }
        }

        return true
    }
}
