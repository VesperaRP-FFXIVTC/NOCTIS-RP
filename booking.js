// ==========================================
// 👑 NOCTIS 預約系統核心大腦 (店長終極修正版)
// ==========================================

const GAS_URL = "https://script.google.com/macros/s/AKfycbz5JEmX7GSl2J2Q1cxdKNZZ8CP5_12jHvFqB6wuIs_MQHNuXEdkfyXjw6dzSU6NOeE9/exec";
const PRICE_STANDARD = 150000;
const PRICE_MIDNIGHT = 300000;

let noctisData = null;

window.addEventListener('DOMContentLoaded', async () => {
    const dateContainer = document.getElementById('dynamic-date-container');
    dateContainer.innerHTML = '<span style="color:#d4af37; font-size: 0.9rem; letter-spacing: 2px;">連線總部中...</span>';
    
    try {
        const response = await fetch(GAS_URL);
        noctisData = await response.json();
        renderDates(); 
        
        // 服務階級切換邏輯
        // 服務階級切換邏輯
        document.querySelectorAll('input[name="serviceTier"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const roomGroup = document.getElementById('room-preference-group');
                const roomSelect = document.getElementById('room-preference');
                const currentTier = radio.value;

                if (currentTier === 'midnight') {
                    // 選 Midnight 時，把包廂區變暗並鎖定
                    if (roomGroup) roomGroup.style.opacity = '0.4';
                    if (roomSelect) roomSelect.disabled = true;
                    // ... 這裡保留您原本的 Midnight Notice 顯示邏輯
                } else {
                    // 選 Standard 時，恢復正常
                    if (roomGroup) roomGroup.style.opacity = '1';
                    if (roomSelect) roomSelect.disabled = false;
                }
                calculateTotal();
            });
        });
    } catch (error) {
        console.error("連線錯誤:", error);
        dateContainer.innerHTML = '<span style="color:#ff4d4d;">連線異常，請聯繫店長。</span>';
    }
});

function renderDates() {
    const container = document.getElementById('dynamic-date-container');
    container.innerHTML = ''; 
    const uniqueDates = [...new Set(noctisData.schedule.map(item => String(item.date).substring(0, 10)))];
    
    if (uniqueDates.length === 0) {
        container.innerHTML = '<span style="color:#888;">近期暫無營業檔期。</span>';
        return;
    }

    uniqueDates.forEach(date => {
        const html = `<label class="select-item"><input type="radio" name="date" value="${date}"><div class="select-box"><b>${date}</b></div></label>`;
        container.insertAdjacentHTML('beforeend', html);
    });

    document.querySelectorAll('input[name="date"]').forEach(radio => {
        radio.addEventListener('change', () => {
            document.getElementById('dynamic-time-container').innerHTML = '';
            document.getElementById('dynamic-pr-container').innerHTML = '';
            renderTimes(radio.value); 
            calculateTotal();
        });
    });
}

function renderTimes(selectedDate) {
    const container = document.getElementById('dynamic-time-container');
    container.innerHTML = ''; 
    let timesArray = [];
    noctisData.schedule.forEach(item => {
        if (String(item.date).substring(0, 10) === String(selectedDate).substring(0, 10)) {
            const t = item.times.split(',').filter(s => s.trim() !== "");
            timesArray = timesArray.concat(t);
        }
    });

    const uniqueTimes = [...new Set(timesArray)].sort((a, b) => {
        if (a === "23:30") return -1;
        if (b === "23:30") return 1;
        return a.localeCompare(b);
    });

    if (uniqueTimes.length === 0) {
        container.innerHTML = '<span style="color:#888;">該日期尚無可用時段。</span>';
        return;
    }

    const allNightHtml = `<label class="select-item" style="grid-column: 1 / -1; margin-bottom: 10px;"><input type="checkbox" id="all-night-toggle"><div class="select-box" style="border-color: #d4af37; color: #d4af37;"><b>✦ ALL-NIGHT / 包夜 ✦</b></div></label>`;
    container.insertAdjacentHTML('beforeend', allNightHtml);

    uniqueTimes.forEach(time => {
        const anyPrAvailable = noctisData.schedule.some(item => {
            if (String(item.date).substring(0, 10) !== String(selectedDate).substring(0, 10)) return false;
            const prTimes = item.times.split(',').map(s => s.trim());
            if (!prTimes.includes(time)) return false;
            const isBooked = noctisData.bookings.some(b => 
                String(b.date).substring(0, 10) === String(selectedDate).substring(0, 10) &&
                b.time.split(',').map(s => s.trim()).includes(time) &&
                b.prs.split(',').map(s => s.trim()).includes(item.pr)
            );
            return !isBooked;
        });

        const isDisabled = !anyPrAvailable;
        const html = `<label class="select-item"><input type="checkbox" name="time" value="${time}" class="time-checkbox" ${isDisabled ? 'disabled' : ''}><div class="select-box"><b>${time}</b></div></label>`;
        container.insertAdjacentHTML('beforeend', html);
    });

    // 💥 更新版提示：將 15 分鐘的漏洞直接轉化為「連約專屬福利」的推銷文案
    const timeNoticeHtml = `
    <div class="time-notice-box" style="grid-column: 1 / -1; margin-top: 25px; padding: 20px; border-left: 2px solid #8a2be2; background: rgba(138, 43, 226, 0.05); border-radius: 4px;">
        <p style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem; margin: 0; letter-spacing: 1.5px; line-height: 1.8;">
            ✦ <b style="color: #b86bff;">極致體驗建議：</b><br>
            您的每個預約時段皆為<span style="color: #d4af37; font-weight: bold;">完整的 30 分鐘專屬互動</span>。<br>
            為確保服務品質，時段與時段之間設有 15 分鐘的緩衝期。<br>
            <span style="color: #fff; border-bottom: 1px solid #8a2be2;">若您連續預約多個時段，緩衝期將無條件轉化為您的「專屬延時福利」，期間不打斷、不計費。</span><br>
            建議您直接勾選連兩個時段，享受最深層、無縫接軌的沉淪體驗。
        </p>
    </div>`;
    container.insertAdjacentHTML('beforeend', timeNoticeHtml);

    document.getElementById('all-night-toggle').addEventListener('change', function() {
        document.querySelectorAll('.time-checkbox:not(:disabled)').forEach(cb => cb.checked = this.checked);
        renderPRs(selectedDate);
        calculateTotal();
    });

    document.querySelectorAll('.time-checkbox').forEach(cb => {
        cb.addEventListener('change', () => { renderPRs(selectedDate); calculateTotal(); });
    });
}

function renderPRs(selectedDate) {
    const container = document.getElementById('dynamic-pr-container');
    const selectedTimes = Array.from(document.querySelectorAll('input[name="time"]:checked')).map(cb => cb.value);
    const tierInput = document.querySelector('input[name="serviceTier"]:checked');
    const currentTier = tierInput ? tierInput.value : 'standard';

    if (selectedTimes.length === 0) {
        container.innerHTML = '';
        calculateTotal();
        return;
    }

    container.innerHTML = ''; 
    const prsOnDuty = noctisData.schedule.filter(item => String(item.date).substring(0, 10) === String(selectedDate).substring(0, 10));
    
    prsOnDuty.forEach(pr => {
        const canMidnightStr = String(pr.canMidnight).toLowerCase().trim();
       

        const html = `<label class="select-item pr-item"><input type="checkbox" name="prs" value="${pr.pr}" data-can-midnight="${pr.canMidnight}"><div class="select-box"><b>${pr.pr}</b></div></label>`;
        container.insertAdjacentHTML('beforeend', html);
    });

    // 💥 修正重點：確保每次生成公關時都重新綁定「保鑣」與「計算」
    document.querySelectorAll('input[name="prs"]').forEach(cb => {
        cb.addEventListener('change', () => {
            checkAvailability(); 
            calculateTotal(); 
        });
    });

    checkAvailability(); 
}

function checkAvailability() {
    const selectedDateElement = document.querySelector('input[name="date"]:checked');
    if (!selectedDateElement) return;
    
    calculateTotal(); // 💥 進入檢查前先算一次，解決第一位沒金額的問題

    const guestSelect = document.getElementById('guest-count');
    const guests = guestSelect ? parseInt(guestSelect.value) : 1;
    const tierInput = document.querySelector('input[name="serviceTier"]:checked');
    const currentTier = tierInput ? tierInput.value : 'standard';
    
    let requiredPRs = (currentTier === 'midnight') ? 1 : Math.ceil(guests / 3);
    const selectedPRs = document.querySelectorAll('input[name="prs"]:checked');

    if (selectedPRs.length > requiredPRs) {
        alert(`✦ NOCTIS 預約準則 ✦\n\n為維持服務純度，您的預約人數 (${guests}位) 依規定僅需指名「${requiredPRs}」位公關。`);
        Array.from(selectedPRs).forEach((cb, index) => { if (index >= requiredPRs) cb.checked = false; });
        calculateTotal(); 
        return; 
    }

    // 反灰邏輯
    const selectedDate = selectedDateElement.value;
    const selectedTimes = Array.from(document.querySelectorAll('input[name="time"]:checked')).map(cb => cb.value);
    const cleanSelectedDate = String(selectedDate).substring(0, 10).replace(/\//g, "-");

    document.querySelectorAll('input[name="prs"]').forEach(input => {
        const prName = input.value;
        const canMidnightStr = String(input.getAttribute('data-can-midnight')).toLowerCase();
        let isAvailable = true;

        if (currentTier === 'midnight' && (canMidnightStr !== 'yes' && canMidnightStr !== 'y')) isAvailable = false;

        const prSchedule = noctisData.schedule.find(item => String(item.date).substring(0, 10).replace(/\//g, "-") === cleanSelectedDate && item.pr === prName);
        const prWorkTimes = prSchedule ? prSchedule.times.split(',').map(s => s.trim()) : [];
        if (!selectedTimes.every(t => prWorkTimes.includes(t))) isAvailable = false;

        if (isAvailable && selectedTimes.length > 0) {
            const isBooked = selectedTimes.some(t => noctisData.bookings.some(b => 
                String(b.date).substring(0, 10).replace(/\//g, "-") === cleanSelectedDate && 
                String(b.time).split(',').map(s => s.trim()).includes(t) && 
                String(b.prs).split(',').map(s => s.trim()).includes(prName)
            ));
            if (isBooked) isAvailable = false;
        }

        if (currentTier === 'midnight' && (canMidnightStr !== 'yes' && canMidnightStr !== 'y')) isAvailable = false;
        input.disabled = !isAvailable;

        // 💥 就是加在這裡！如果公關被反灰不可選，就強制幫客人取消打勾
        if (!isAvailable) {
            input.checked = false;
        }
    });
}

function calculateTotal() {
    const tierInput = document.querySelector('input[name="serviceTier"]:checked');
    if (!tierInput) return;
    
    const basePrice = (tierInput.value === 'midnight') ? PRICE_MIDNIGHT : PRICE_STANDARD;
    const periodsCount = document.querySelectorAll('input[name="time"]:checked').length;
    const prsCount = document.querySelectorAll('input[name="prs"]:checked').length;

    const total = basePrice * periodsCount * prsCount;
    document.getElementById('display-periods').innerText = periodsCount;
    document.getElementById('display-cats').innerText = prsCount;
    document.getElementById('total-amount').innerText = total.toLocaleString();
}

document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const selectedDate = document.querySelector('input[name="date"]:checked')?.value;
    const selectedTimes = Array.from(document.querySelectorAll('input[name="time"]:checked')).map(cb => cb.value).join(', ');
    const selectedPRs = Array.from(document.querySelectorAll('input[name="prs"]:checked')).map(cb => cb.value);
    const roomPref = (tierInput === 'MIDNIGHT') ? "私密房間 (預設)" : document.getElementById('room-preference').value;
    formData.append('roomPreference', roomPref);
    if (!selectedDate || !selectedTimes || selectedPRs.length === 0) {
        alert("✦ 預約失敗：請完整選擇日期、時段與指名公關。");
        return;
    }

    const guestCount = parseInt(document.getElementById('guest-count').value);
    const tierInput = document.querySelector('input[name="serviceTier"]:checked').value;
    const requiredPRs = (tierInput === 'midnight') ? 1 : Math.ceil(guestCount / 3);

    if (selectedPRs.length !== requiredPRs) {
        alert(`✦ NOCTIS 預約規範提示 ✦\n\n依照規定需指名「${requiredPRs}」位公關。\n目前已選：${selectedPRs.length} 位。`);
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "✦ 資 料 傳 送 中 ✦";
    submitBtn.disabled = true;

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('contact', document.getElementById('contact-info').value);
    formData.append('serviceTier', tierInput.toUpperCase());
    formData.append('date', selectedDate);
    formData.append('time', selectedTimes);
    formData.append('prs', selectedPRs.join(', '));
    formData.append('notes', document.getElementById('notes').value || "無");
    formData.append('totalPrice', document.getElementById('total-amount').innerText);

    try {
        await fetch(GAS_URL, { method: 'POST', body: formData, mode: 'no-cors' });
        alert("✦ 預約成功！\n資料已傳送至 NOCTIS 總部。");
        window.location.reload();
    } catch (error) {
        alert("✦ 系統錯誤：傳送失敗。");
        submitBtn.innerText = "送 出 預 約 申 請";
        submitBtn.disabled = false;
    }
});

window.updateRequiredPRCount = function() {
    const guestSelect = document.getElementById('guest-count');
    const numDisplay = document.getElementById('pr-count-num');
    const tierInput = document.querySelector('input[name="serviceTier"]:checked');
    if (!guestSelect || !numDisplay) return;
    
    const required = (tierInput && tierInput.value === 'midnight') ? 1 : Math.ceil(parseInt(guestSelect.value) / 3); 
    numDisplay.innerText = required;
    document.querySelectorAll('input[name="prs"]').forEach(cb => cb.checked = false);
    checkAvailability();
};