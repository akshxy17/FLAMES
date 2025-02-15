document.getElementById('calculate').addEventListener('click', function () {
    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();

    if (!name1 || !name2) {
        alert("Please enter both names!");
        return;
    }

    const result = calculateFlames(name1, name2);
    const resultText = `FLAMES Result: ${result} (${name1} ❤️ ${name2})`;
    document.getElementById('result').innerText = resultText;

    // Show the Download and Share buttons
    document.getElementById('download-image').style.display = 'block';
    document.getElementById('share-image').style.display = 'block';

    // Trigger heart animation if the result is "Lovers"
    if (result === "Lovers") {
        createHearts();
    }
});

document.getElementById('reload').addEventListener('click', function () {
    // Clear input fields and result
    document.getElementById('name1').value = '';
    document.getElementById('name2').value = '';
    document.getElementById('result').innerText = '';
    document.getElementById('download-image').style.display = 'none';
    document.getElementById('share-image').style.display = 'none';
    
    // Clear the hearts
    document.getElementById('heart-container').innerHTML = '';
});

document.getElementById('download-image').addEventListener('click', function () {
    html2canvas(document.querySelector("#result-container")).then(canvas => {
        const link = document.createElement('a');
        link.download = 'flames-result.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

document.getElementById('share-image').addEventListener('click', function () {
    html2canvas(document.querySelector("#result-container")).then(canvas => {
        canvas.toBlob(function (blob) {
            const file = new File([blob], 'flames-result.png', { type: 'image/png' });

            if (navigator.share) {
                navigator.share({
                    files: [file],
                    title: 'FLAMES Result',
                    text: 'Check out my FLAMES result!',
                })
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Error sharing:', error));
            } else {
                alert("Sharing not supported in this browser. Download the image instead.");
            }
        });
    });
});

function calculateFlames(name1, name2) {
    // Remove common letters
    for (let char of name1) {
        if (name2.includes(char)) {
            name1 = name1.replace(char, '');
            name2 = name2.replace(char, '');
        }
    }

    const totalLength = name1.length + name2.length;
    const flames = ["Friends", "Lovers", "Affectionate", "Marriage", "Enemies", "Siblings"];

    const index = totalLength % flames.length;
    return index === 0 ? flames[flames.length - 1] : flames[index - 1];
}

// Heart Animation Function
function createHearts() {
    const heartContainer = document.getElementById('heart-container');
    heartContainer.innerHTML = ''; // Clear previous hearts

    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heartContainer.appendChild(heart);
    }
}