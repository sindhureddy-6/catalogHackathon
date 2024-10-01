const fs = require('fs');


const baseToDecimal = (value, base) => parseInt(value, base);


const lagrangeInterpolation = (points) => {
    const n = points.length;
    let c = 0;

    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let term = yi;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let xj = points[j][0];
                term *= (0 - xj) / (xi - xj);
            }
        }
        c += term;
    }

    return Math.round(c);
};


fs.readFile('input.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }

   
    const jsonObject = JSON.parse(data);

    const n = jsonObject.keys.n;
    const k = jsonObject.keys.k;

    const points = [];

 
    for (const [key, value] of Object.entries(jsonObject)) {
        if (key === 'keys') continue;

        const base = parseInt(value.base);
        const decodedValue = baseToDecimal(value.value, base);
        const x = parseInt(key);
        points.push([x, decodedValue]);
    }

    if (points.length < k) {
        console.error("Not enough points to perform interpolation.");
        return;
    }


    const secretC = lagrangeInterpolation(points);
    console.log(`The constant term (secret c) is: ${secretC}`);
});
