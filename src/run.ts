const inputA = document.getElementById("A") as HTMLInputElement
const inputB = document.getElementById("B") as HTMLInputElement
const button = document.getElementById("calculate") as HTMLButtonElement

if (!button || !inputA || !inputB) throw new Error()

button.onclick = () => {
    try {
        const A = JSON.parse(`[${inputA.value}]`)
        const B = JSON.parse(`[${inputB.value}]`)
        plot(new F(A), new F(B))
    } catch (error) {
        alert(error)
    }
}
