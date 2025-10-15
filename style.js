/* style.js */

/* =====================================================================
   Dynamic Theme Customization
===================================================================== */

/**
 * メインカラーを更新する関数
 */
function updateMainColor(color) {
    document.documentElement.style.setProperty('--main-color', color);
    localStorage.setItem('mainColor', color); // メインカラーを保存
}

/**
 * サブカラーを更新する関数
 */
function updateSubColor(color) {
    document.documentElement.style.setProperty('--sub-color', color);
    localStorage.setItem('subColor', color); // サブカラーを保存
}

/**
 * フォントファミリーを更新する関数
 */
function updateFontFamily(fontFamily) {
    document.documentElement.style.setProperty('--font-family', fontFamily);
    localStorage.setItem('fontFamily', fontFamily); // フォントファミリーを保存

    // Google Fontsのリンクを動的に変更
    const googleFontLink = document.getElementById('google-font');
    if (googleFontLink) {
        googleFontLink.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
            ' ',
            '+'
        )}:wght@400;500;700&display=swap`;
    }
}

/**
 * ページ読み込み時にカスタム設定を適用する関数
 */
function applyCustomSettings() {
    const mainColor = localStorage.getItem('mainColor') || '#172a88';
    const subColor = localStorage.getItem('subColor') || '#df0522';
    const fontFamily = localStorage.getItem('fontFamily') || 'Roboto';

    updateMainColor(mainColor);
    updateSubColor(subColor);
    updateFontFamily(fontFamily);

    // index.html 以外のページではカラーピッカーなどがないため、条件付きで更新
    const colorPicker = document.getElementById('colorPicker');
    const subColorPicker = document.getElementById('subColorPicker');
    const fontPicker = document.getElementById('fontPicker');

    if (colorPicker) colorPicker.value = mainColor;
    if (subColorPicker) subColorPicker.value = subColor;
    if (fontPicker) fontPicker.value = fontFamily;
}

document.addEventListener('DOMContentLoaded', () => {
    // ページ読み込み時にカスタム設定を適用
    applyCustomSettings();

    const colorPicker = document.getElementById('colorPicker');
    const subColorPicker = document.getElementById('subColorPicker');
    const fontPicker = document.getElementById('fontPicker');
    const saveButton = document.getElementById('saveSettings');
    const resetButton = document.getElementById('resetSettings');

    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            updateMainColor(e.target.value);
        });
    }

    if (subColorPicker) {
        subColorPicker.addEventListener('input', (e) => {
            updateSubColor(e.target.value);
        });
    }

    if (fontPicker) {
        fontPicker.addEventListener('change', (e) => {
            updateFontFamily(e.target.value);
        });
    }

    // 保存ボタンのイベントリスナー
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            localStorage.setItem('mainColor', colorPicker.value);
            localStorage.setItem('subColor', subColorPicker.value);
            localStorage.setItem('fontFamily', fontPicker.value);

            alert('Settings saved! All pages will now reflect the changes.');
        });
    }

    // リセットボタンのイベントリスナー
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            localStorage.removeItem('mainColor');
            localStorage.removeItem('subColor');
            localStorage.removeItem('fontFamily');
            location.reload();  // ページをリロードしてデフォルト設定に戻す
        });
    }
});



/* =====================================================================
   Page-Specific Scripts
===================================================================== */

/* 例: Index Page Specific Script */
document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('colorPicker');
    const fontPicker = document.getElementById('fontPicker');

    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            updateMainColor(e.target.value);
        });
    }

    if (fontPicker) {
        fontPicker.addEventListener('change', (e) => {
            updateFontFamily(e.target.value);
        });
    }
});

/* 他のページ固有のスクリプトも同様にセクションを分けて追加 */

/* =====================================================================
   SITE SIGNUP QUESTIONARY
===================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        {
            id: 'question1',
            question: '1. お住まい（都道府県）',
            type: 'select',
            options: ['北海道', '東京都', '大阪府', '福岡県', '沖縄県'],
        },
        {
            id: 'question2',
            question: '2. 好きな映画のジャンル',
            type: 'checkbox',
            options: ['アクション', 'コメディ', 'ドラマ', 'ホラー', 'SF', 'アニメ'],
        },
        {
            id: 'question3',
            question: '3. 仕事',
            type: 'radio',
            options: ['会社員', '自営業', '学生', '無職', 'その他'],
        },
        {
            id: 'question4',
            question: '4. 子供の人数',
            type: 'text',
            placeholder: '例: 2人',
        },
        {
            id: 'question5',
            question: '5. 未婚既婚',
            type: 'radio',
            options: ['未婚', '既婚'],
        },
        {
            id: 'question6',
            question: '6. 年代',
            type: 'select',
            options: ['10代', '20代', '30代', '40代', '50代', '60代以上'],
        },
        {
            id: 'question7',
            question: '7. 困っていること',
            type: 'textarea',
            placeholder: '自由にお書きください',
        },
    ];

    const questionContainer = document.getElementById('question-container');
    
    // question-container要素が存在しない場合は処理を終了
    if (!questionContainer) {
        console.log('question-container要素が見つかりません。このページでは質問機能は使用されません。');
        return;
    }

    function showConfirmation() {
        let confirmationHtml = '<h4>確認画面</h4>';
        questions.forEach((question, index) => {
            confirmationHtml += `<p><strong>${question.question}</strong><br>回答内容 ${index + 1}</p>`;
        });

        confirmationHtml += `
            <button class="btn btn-secondary" id="back-button">戻る</button>
            <a href="site_signup_confirm.html" class="btn btn-success">登録する</a>
        `;
        questionContainer.innerHTML = confirmationHtml;

        document.getElementById('back-button').addEventListener('click', function () {
            showQuestion(0);
        });
    }

    function showQuestion(index) {
        if (index >= questions.length) {
            showConfirmation();
            return;
        }

        const question = questions[index];
        let html = `<h4>${question.question}</h4>`;

        if (question.type === 'select') {
            html += `<select class="form-select mb-3" id="${question.id}">`;
            question.options.forEach(option => {
                html += `<option value="${option}">${option}</option>`;
            });
            html += `</select>`;
        } else if (question.type === 'checkbox') {
            question.options.forEach(option => {
                html += `
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="${option}" id="${option}">
                        <label class="form-check-label" for="${option}">
                            ${option}
                        </label>
                    </div>`;
            });
        } else if (question.type === 'radio') {
            question.options.forEach(option => {
                html += `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="${question.id}" value="${option}" id="${option}">
                        <label class="form-check-label" for="${option}">
                            ${option}
                        </label>
                    </div>`;
            });
        } else if (question.type === 'text') {
            html += `<input type="text" class="form-control mb-3" id="${question.id}" placeholder="${question.placeholder}" required>`;
        } else if (question.type === 'textarea') {
            html += `<textarea class="form-control mb-3" id="${question.id}" rows="3" placeholder="${question.placeholder}"></textarea>`;
        }

        html += `<button class="btn btn-primary" id="next-button">次へ</button>`;
        questionContainer.innerHTML = html;

        document.getElementById('next-button').addEventListener('click', function () {
            showQuestion(index + 1);
        });
    }

    showQuestion(0);
});
