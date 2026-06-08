document.getElementById("enrollBtn").addEventListener("click", function() {
    alert('Thanx! Form for enrollment is coming soon!');
});

document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById('news-container');

    if (!newsContainer) return;

    fetch('news.json')
        .then(response => {
            if (!response.ok) throw new Error('Немає файлу новин');
            return response.json();
        })
        .then(data => {
            newsContainer.innerHTML = '';

            if (!data.items || data.items.length === 0) {
                newsContainer.innerHTML = '<p style="text-align: center; color: #4A5568;">Zatiaľ tu nie sú žiadne aktuality.</p>';
                return;
            }

            data.items.forEach(item => {
                const article = document.createElement('article');
                article.className = 'news-item';

                let htmlContent = `<span class="news-date">${item.date}</span>`;
                htmlContent += `<h3>${item.title}</h3>`;
                
                if (item.image) {
                    htmlContent += `<img src="${item.image}" alt="${item.title}" style="max-width: 100%; border-radius: 15px; margin-bottom: 15px;">`;
                }

                const formattedText = item.body.replace(/\n/g, '<br>');
                htmlContent += `<p>${formattedText}</p>`;

                article.innerHTML = htmlContent;
                newsContainer.appendChild(article);
            });
        })
        .catch(error => {
            newsContainer.innerHTML = '<p style="text-align: center; color: #4A5568;">Zatiaľ tu nie sú žiadne aktuality.</p>';
        });
});
