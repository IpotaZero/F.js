"use strict";
function plot(A, B) {
    const A_set = [...A.set].sort((a, b) => a - b);
    const B_set = [...B.set].sort((a, b) => a - b);
    const AB_set = [...A.insertTo(B).set].sort((a, b) => a - b);
    const size = (AB_set[AB_set.length - 1] ?? 0) + 2;
    // ---------- 点の描画 ----------
    const points = [];
    points.push({
        x: Array(B_set.length).fill(2),
        y: B_set,
        mode: "markers",
        marker: { color: "red" },
        name: "B",
        type: "scatter",
    });
    points.push({
        x: Array(A_set.length).fill(3),
        y: A_set,
        mode: "markers",
        marker: { color: "blue" },
        name: "A",
        type: "scatter",
    });
    const from_A = AB_set.filter((x) => A_set.includes(x));
    const from_notA = AB_set.filter((x) => !A_set.includes(x));
    points.push({
        x: Array(from_notA.length).fill(4),
        y: from_notA,
        mode: "markers",
        marker: { color: "red" },
        name: "from not A",
        showlegend: false,
        type: "scatter",
    });
    points.push({
        x: Array(from_A.length).fill(4),
        y: from_A,
        mode: "markers",
        marker: { color: "blue" },
        name: "from A",
        showlegend: false,
        type: "scatter",
    });
    // ---------- 矢印の描画 ----------
    const natural_numbers = [...Array(size).keys()];
    const phi_B_N = natural_numbers.map((n) => B.phi(n));
    const shapes = [];
    // B: n → B.phi(n)
    for (const n of natural_numbers) {
        shapes.push({
            type: "line",
            x0: 1,
            y0: n,
            x1: 2,
            y1: B.phi(n),
            line: { color: "black", width: 1 },
            arrowhead: 20,
        });
    }
    // A: n → A.phi(n)
    for (const n of natural_numbers) {
        const color = phi_B_N.includes(n) ? "black" : "red";
        shapes.push({
            type: "line",
            x0: 2,
            y0: n,
            x1: 3,
            y1: A.phi(n),
            line: { color, width: 1 },
            arrowhead: 20,
        });
    }
    // ---------- 描画 ----------
    const layout = {
        title: `Plot of A, B, A*B, and B.phi(n)`,
        xaxis: {
            tickvals: [1, 2, 3, 4],
            ticktext: [
                "N",
                `B=${JSON.stringify(B_set)}`,
                `A=${JSON.stringify(A_set)}`,
                `A*B=${JSON.stringify(AB_set)}`,
            ],
            range: [0.5, 4.5],
        },
        yaxis: {
            title: "Values",
            tickmode: "linear",
            tick0: 0,
            dtick: 1,
            range: [-0.5, size],
        },
        shapes,
        showlegend: true,
        margin: { "l": 20, "r": 0 },
    };
    Plotly.newPlot("graph", [...points], layout);
}
