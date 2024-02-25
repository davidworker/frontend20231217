// 抓取 dom
let dom_num = document.querySelector('#num');
let dom_calc_btn = document.querySelector('#calc-btn');
let dom_response = document.querySelector('#response');

// 觀察是否有正確抓到 dom
console.log(dom_num, dom_calc_btn, dom_response);

const transferToLevel = (num) => {
    let level = '';

    return level;
}


// 當按下計算按鈕時，抓取數字輸入匡內容
const calcLevel = (e) => {
    console.log('start calc.');
    let currentNum = num.value;
    // 印出當前輸入框分數
    console.log(currentNum);

    // 檢查是否有輸入分數 [v]

    // 檢查分數是否落在 0 ~ 100 之間 [v]

    // 計算等級 [v]
    let level = transferToLevel(currentNum);

    // 顯示在 dom_response 內，格視為: 您的分數: oo, 等級: xx
    let content = `您的分數: ${currentNum}, 等級: ${level}`;
    dom_response.innerHTML = content;
}

dom_calc_btn.addEventListener('click', calcLevel);

/**
 * 1. 抓取 dom
 * 2. 當按下計算按鈕時，抓取數字輸入匡內容
 * 3. 印出當前輸入框分數
 * 4. 檢查是否有輸入分數
 * 5. 檢查分數是否落在 0 ~ 100 之間
 * 6. 計算等級
 * 7. 顯示在 dom_response 內，格視為: 您的分數: oo, 等級: xx
 */