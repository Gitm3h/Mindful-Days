// ==========================================================================
// MINDFUL DAYS APPLICATION LOGIC
// ==========================================================================

// --- Curated Database of 52 Wise, Positive Quotes ---
const QUOTES = [
    { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
    { text: "You should sit in meditation for twenty minutes every day — unless you're too busy; then you should sit for an hour.", author: "Zen Proverb" },
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
    { text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", author: "Thich Nhat Hanh" },
    { text: "The little things? The little moments? They aren't little.", author: "Jon Kabat-Zinn" },
    { text: "Look at the trees, look at the birds, look at the clouds, look at the stars... and if you have eyes you will be able to see that the whole existence is a joy.", author: "Osho" },
    { text: "Be here now.", author: "Ram Dass" },
    { text: "Mindfulness is a way of befriending ourselves and our experience.", author: "Jon Kabat-Zinn" },
    { text: "Quiet the mind and the soul will speak.", author: "Ma Jaya Sati Bhagavati" },
    { text: "The best way to capture moments is to pay attention. This is how we cultivate mindfulness.", author: "Jon Kabat-Zinn" },
    { text: "Life is a dance. Mindfulness is witnessing that dance.", author: "Amit Ray" },
    { text: "You are the sky. Everything else – it's just the weather.", author: "Pema Chödrön" },
    { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time and be yourself.", author: "Hermann Hesse" },
    { text: "Wherever you go, there you are.", author: "Jon Kabat-Zinn" },
    { text: "To understand everything is to forgive everything.", author: "Gautama Buddha" },
    { text: "The only way to live is the present moment.", author: "Thich Nhat Hanh" },
    { text: "Adopt the pace of nature: her secret is patience.", author: "Ralph Waldo Emerson" },
    { text: "He who is contented is rich.", author: "Lao Tzu" },
    { text: "Simplicity, patience, compassion. These three are your greatest treasures.", author: "Lao Tzu" },
    { text: "To the mind that is still, the whole universe surrenders.", author: "Lao Tzu" },
    { text: "If you want to conquer the anxiety of life, live in the moment, live in the breath.", author: "Amit Ray" },
    { text: "Wisdom begins in wonder.", author: "Socrates" },
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { text: "An unexamined life is not worth living.", author: "Socrates" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
    { text: "Happiness depends upon ourselves.", author: "Aristotle" },
    { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
    { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
    { text: "What does not kill me makes me stronger.", author: "Friedrich Nietzsche" },
    { text: "Although the world is full of suffering, it is also full of the overcoming of it.", author: "Helen Keller" },
    { text: "Nothing is permanent in this wicked world - not even our troubles.", author: "Charlie Chaplin" },
    { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "Where there is love there is life.", author: "Mahatma Gandhi" },
    { text: "The weak can never forgive. Forgiveness is the attribute of the strong.", author: "Mahatma Gandhi" },
    { text: "Truth is simple. If it's not simple, it's not truth.", author: "Leo Tolstoy" },
    { text: "If you want to be happy, be.", author: "Leo Tolstoy" },
    { text: "There is only one time that is important - Now! It is the most important time because it is the only time when we have any power.", author: "Leo Tolstoy" },
    { text: "I can control my passions and emotions if I can understand their nature.", author: "Baruch Spinoza" },
    { text: "The highest activity a human being can attain is learning for understanding, because to understand is to be free.", author: "Baruch Spinoza" },
    { text: "Nothing is beautiful but the truth.", author: "Nicolas Boileau" },
    { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "No masterpiece was ever created by a lazy artist.", author: "Salvador Dali" },
    { text: "Intelligence without ambition is a bird without wings.", author: "Salvador Dali" },
    { text: "Surrealism is destructive, but it destroys only what it limits our vision.", author: "Salvador Dali" },
    { text: "Out of clutter, find simplicity.", author: "Albert Einstein" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "The measure of intelligence is the ability to change.", author: "Albert Einstein" },
    { text: "Logic will get you from A to Z; imagination will get you everywhere.", author: "Albert Einstein" },
    { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
    { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" }
];

// --- Default Activity Presets for Social Battery ---
const DEFAULT_CHARGERS = [
    { name: "Spent time in nature", value: 20 },
    { name: "Read a nice book", value: 15 },
    { name: "Did meditation", value: 15 },
    { name: "Deep restful sleep", value: 25 },
    { name: "Connected with a friend", value: 20 },
    { name: "Creative hobby", value: 15 },
    { name: "Did chores", value: 15 }
];

const DEFAULT_DRAINERS = [
    { name: "Attended a work meeting", value: -25 },
    { name: "Had small talk", value: -10 },
    { name: "Commuting in traffic", value: -15 },
    { name: "Crowded noisy social event", value: -30 },
    { name: "Anxious screen scrolling", value: -15 }
];

// --- State Variables ---
let state = {
    selectedDate: new Date(), // Date object
    activeTab: 'journal',
    calendarExpanded: false,
    calendarViewMode: 'week', // 'week' or 'month'
    
    // Custom activities preset database stored in localStorage
    customPresets: [],
    
    // Loaded journal/battery data for selectedDate
    activeDayData: {
        thoughts: "",
        gratitude: [],
        change: [],
        tasks: [],
        tracker: [],
        batteryBase: 50,
        batteryLogs: []
    },
    
    // Modal states for editing
    editModal: {
        type: null, // 'gratitude', 'change', 'tasks', 'tracker'
        index: null,
        value: ""
    }
};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    // Load custom activity presets from localStorage
    const savedCustomPresets = localStorage.getItem("mindful_custom_presets");
    if (savedCustomPresets) {
        state.customPresets = JSON.parse(savedCustomPresets);
    }
    
    // Wire up events
    initEventListeners();
    
    // Load selected date's data
    loadDayData(state.selectedDate);
    
    // Set up default view
    renderAll();

    // Initialize nature soundscape settings
    initSoundscape();
});

// --- Event Listeners Setup ---
function initEventListeners() {
    // Day navigation
    document.getElementById("prev-day-btn").addEventListener("click", () => shiftDay(-1));
    document.getElementById("next-day-btn").addEventListener("click", () => shiftDay(1));
    document.getElementById("today-btn").addEventListener("click", () => selectDate(new Date()));
    
    // Calendar Drawer Expansion
    document.getElementById("expand-calendar-btn").addEventListener("click", toggleCalendarDrawer);
    document.getElementById("view-week-btn").addEventListener("click", () => setCalendarViewMode('week'));
    document.getElementById("view-month-btn").addEventListener("click", () => setCalendarViewMode('month'));
    
    // Thoughts textbox auto-save
    const thoughtsTextarea = document.getElementById("thoughts-input");
    thoughtsTextarea.addEventListener("input", (e) => {
        state.activeDayData.thoughts = e.target.value;
        updateCharCounter();
        triggerAutoSave();
    });
    
    // Gratitude form submit
    document.getElementById("form-gratitude").addEventListener("submit", (e) => {
        e.preventDefault();
        addItem('gratitude', document.getElementById("input-gratitude"));
    });
    
    // Change form submit
    document.getElementById("form-change").addEventListener("submit", (e) => {
        e.preventDefault();
        addItem('change', document.getElementById("input-change"));
    });
    
    // Tasks form submit
    document.getElementById("form-tasks").addEventListener("submit", (e) => {
        e.preventDefault();
        addItem('tasks', document.getElementById("input-tasks"));
    });
    
    // Tracker form submit
    document.getElementById("form-tracker").addEventListener("submit", (e) => {
        e.preventDefault();
        addItem('tracker', document.getElementById("input-tracker"));
    });

    // Social battery base slider
    const baseSlider = document.getElementById("battery-base-slider");
    baseSlider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value, 10);
        state.activeDayData.batteryBase = val;
        document.getElementById("battery-base-value").textContent = val + "%";
        saveActiveDayData();
        updateBatteryDisplay();
    });

    // Custom Social Activity form submit
    document.getElementById("custom-activity-form").addEventListener("submit", handleCustomActivitySubmit);

    // Clear logs button
    document.getElementById("clear-battery-logs-btn").addEventListener("click", clearBatteryLogs);

    // Modal Actions
    document.getElementById("modal-cancel-btn").addEventListener("click", closeEditModal);
    document.getElementById("modal-save-btn").addEventListener("click", saveEditModalChanges);
    
    // Close modal on overlay click
    document.getElementById("edit-modal").addEventListener("click", (e) => {
        if (e.target.id === "edit-modal") closeEditModal();
    });

    // Soundscape main toggle
    document.getElementById("soundscape-play-btn").addEventListener("click", toggleSoundscape);
    // Soundscape header toggle mixer
    document.getElementById("soundscape-header").addEventListener("click", (e) => {
        if (e.target.closest("#soundscape-play-btn")) return;
        toggleSoundscapeMixer();
    });
    // Individual channel volume controls
    ['rain', 'wind', 'birds', 'campfire'].forEach(sound => {
        const slider = document.getElementById(`volume-${sound}`);
        slider.addEventListener("input", (e) => {
            const val = parseInt(e.target.value, 10);
            updateChannelVolume(sound, val);
        });
    });
}

// --- Date Formatting Helpers ---
function getDateString(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function getPrettyDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

// --- Load / Save Operations ---
function loadDayData(date) {
    const key = `mindful_day_${getDateString(date)}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
        state.activeDayData = JSON.parse(stored);
        // Guarantee fields exist for backwards compatibility or partial data
        if (!state.activeDayData.gratitude) state.activeDayData.gratitude = [];
        if (!state.activeDayData.change) state.activeDayData.change = [];
        if (!state.activeDayData.tasks) state.activeDayData.tasks = [];
        if (!state.activeDayData.tracker) state.activeDayData.tracker = [];
        if (state.activeDayData.batteryBase === undefined) state.activeDayData.batteryBase = 50;
        if (!state.activeDayData.batteryLogs) state.activeDayData.batteryLogs = [];
    } else {
        // Clear templates for a fresh day
        state.activeDayData = {
            thoughts: "",
            gratitude: [],
            change: [],
            tasks: [],
            tracker: [],
            batteryBase: 50,
            batteryLogs: []
        };
    }
}

function saveActiveDayData() {
    const key = `mindful_day_${getDateString(state.selectedDate)}`;
    localStorage.setItem(key, JSON.stringify(state.activeDayData));
    
    // Update indicator dots on calendar drawer if rendered
    renderCalendarGrid();
}

// --- Debounced Auto-Save ---
let saveTimeout = null;
function triggerAutoSave() {
    const statusEl = document.getElementById("save-status");
    statusEl.innerHTML = `<span style="color: var(--text-secondary);">Saving...</span>`;
    
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveActiveDayData();
        statusEl.innerHTML = `Auto-saved locally`;
    }, 500);
}

// --- Tab Switching ---
window.switchTab = function(tabName) {
    state.activeTab = tabName;
    
    // Toggle active classes on nav buttons
    document.getElementById("nav-journal").classList.toggle("active", tabName === 'journal');
    document.getElementById("nav-battery").classList.toggle("active", tabName === 'battery');
    
    // Toggle content visibility
    document.getElementById("tab-journal-content").classList.toggle("active", tabName === 'journal');
    document.getElementById("tab-battery-content").classList.toggle("active", tabName === 'battery');
    
    // Trigger specific rendering/resizing if needed
    if (tabName === 'battery') {
        updateBatteryDisplay();
    }
};

// --- Render Central Manager ---
function renderAll() {
    // 1. Render Date Headers
    const dateTitle = document.getElementById("current-date-title");
    const dateSubtitle = document.getElementById("date-subtitle");
    dateTitle.textContent = getPrettyDate(state.selectedDate);
    dateSubtitle.textContent = isToday(state.selectedDate) ? "Today" : "Reflection View";
    
    // Disable Next Day arrow if it goes into the future (Optional: let them log ahead, but it's cleaner to allow it, let's keep it enabled but tell them)
    
    // 2. Render Quote of the Day
    renderQuote();
    
    // 3. Render Thoughts text
    const thoughtsInput = document.getElementById("thoughts-input");
    thoughtsInput.value = state.activeDayData.thoughts;
    updateCharCounter();
    
    // 4. Render the 4 Lists
    renderList('gratitude');
    renderList('change');
    renderList('tasks');
    renderList('tracker');
    
    // 5. Render Calendar elements
    renderCalendarGrid();
    
    // 6. Render Social Battery
    updateBatteryDisplay();
}

// --- Shift Date (Prev / Next Arrows) ---
function shiftDay(days) {
    const current = new Date(state.selectedDate);
    current.setDate(current.getDate() + days);
    selectDate(current);
}

function selectDate(date) {
    state.selectedDate = new Date(date);
    loadDayData(state.selectedDate);
    renderAll();
}

// --- Collapsible Calendar Drawer ---
function toggleCalendarDrawer() {
    state.calendarExpanded = !state.calendarExpanded;
    const drawer = document.getElementById("calendar-drawer");
    const btnText = document.getElementById("expand-btn-text");
    
    if (state.calendarExpanded) {
        drawer.classList.add("expanded");
        btnText.textContent = "Collapse Calendar";
        renderCalendarGrid();
    } else {
        drawer.classList.remove("expanded");
        btnText.textContent = "Expand Calendar";
    }
}

function setCalendarViewMode(mode) {
    state.calendarViewMode = mode;
    document.getElementById("view-week-btn").classList.toggle("active", mode === 'week');
    document.getElementById("view-month-btn").classList.toggle("active", mode === 'month');
    renderCalendarGrid();
}

function renderCalendarGrid() {
    const gridContainer = document.getElementById("calendar-grid-container");
    gridContainer.innerHTML = "";
    
    if (state.calendarViewMode === 'week') {
        gridContainer.className = "calendar-grid-container week-mode";
        renderWeekView(gridContainer);
    } else {
        gridContainer.className = "calendar-grid-container month-mode";
        renderMonthView(gridContainer);
    }
}

function renderWeekView(container) {
    // Compute current week: Monday to Sunday centered around state.selectedDate
    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    
    // Grid headers
    daysOfWeek.forEach(day => {
        const header = document.createElement("div");
        header.className = "calendar-grid-header";
        header.textContent = day;
        container.appendChild(header);
    });
    
    const activeDate = new Date(state.selectedDate);
    // getDay() gives 0-6 (0 is Sunday). Let's convert so 1 is Monday, ..., 0 is Sunday
    let dayIndex = activeDate.getDay();
    if (dayIndex === 0) dayIndex = 7; // make Sunday 7
    
    const startOfWeek = new Date(activeDate);
    startOfWeek.setDate(activeDate.getDate() - (dayIndex - 1));
    
    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        
        const cell = createDayCell(currentDay);
        container.appendChild(cell);
    }
}

function renderMonthView(container) {
    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    
    // Grid headers
    daysOfWeek.forEach(day => {
        const header = document.createElement("div");
        header.className = "calendar-grid-header";
        header.textContent = day;
        container.appendChild(header);
    });
    
    const activeDate = new Date(state.selectedDate);
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth();
    
    // First day of current month
    const firstDayOfMonth = new Date(year, month, 1);
    let firstDayIndex = firstDayOfMonth.getDay(); // 0 is Sunday
    if (firstDayIndex === 0) firstDayIndex = 7;
    
    // Last day of current month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Previous month details for filling grid
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    
    // We need to render cells.
    // Days from prev month: firstDayIndex - 1 days
    for (let i = firstDayIndex - 1; i > 0; i--) {
        const prevDay = new Date(year, month - 1, lastDayOfPrevMonth - i + 1);
        const cell = createDayCell(prevDay);
        cell.classList.add("other-month");
        container.appendChild(cell);
    }
    
    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
        const currDay = new Date(year, month, i);
        const cell = createDayCell(currDay);
        container.appendChild(cell);
    }
    
    // Days from next month to fill grid to multiples of 7
    const totalCells = Math.ceil((firstDayIndex - 1 + daysInMonth) / 7) * 7;
    const nextMonthFillerCount = totalCells - (firstDayIndex - 1 + daysInMonth);
    for (let i = 1; i <= nextMonthFillerCount; i++) {
        const nextDay = new Date(year, month + 1, i);
        const cell = createDayCell(nextDay);
        cell.classList.add("other-month");
        container.appendChild(cell);
    }
}

function createDayCell(date) {
    const cell = document.createElement("div");
    cell.className = "calendar-day-cell";
    cell.textContent = date.getDate();
    
    const dateStr = getDateString(date);
    
    if (isToday(date)) {
        cell.classList.add("today");
    }
    
    if (getDateString(state.selectedDate) === dateStr) {
        cell.classList.add("selected");
    }
    
    // Check if this date has any stored logs to render indicator dot
    const key = `mindful_day_${dateStr}`;
    const stored = localStorage.getItem(key);
    if (stored) {
        const parsed = JSON.parse(stored);
        const hasContent = (parsed.thoughts && parsed.thoughts.trim() !== "") ||
                          (parsed.gratitude && parsed.gratitude.length > 0) ||
                          (parsed.change && parsed.change.length > 0) ||
                          (parsed.tasks && parsed.tasks.length > 0) ||
                          (parsed.batteryLogs && parsed.batteryLogs.length > 0);
        
        if (hasContent) {
            const dot = document.createElement("div");
            dot.className = "day-indicator";
            cell.appendChild(dot);
        }
    }
    
    // Click behavior
    cell.addEventListener("click", () => {
        selectDate(date);
    });
    
    return cell;
}

// --- Quote Engine ---
function renderQuote() {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
    
    // Choose quote deterministically based on date numbers (YYYY + MM + DD)
    const dateNum = state.selectedDate.getFullYear() + (state.selectedDate.getMonth() + 1) + state.selectedDate.getDate();
    const index = dateNum % QUOTES.length;
    const selectedQuote = QUOTES[index];
    
    quoteText.textContent = `"${selectedQuote.text}"`;
    quoteAuthor.textContent = `— ${selectedQuote.author}`;
}

// --- Character Counter Helper ---
function updateCharCounter() {
    const counter = document.getElementById("char-counter");
    const text = state.activeDayData.thoughts || "";
    counter.textContent = `${text.length} / 5000`;
}

// --- Lists Core Management (Gratitude, Change, Tasks) ---
function renderList(type) {
    const listContainer = document.getElementById(`list-${type}-items`);
    const countEl = document.getElementById(`count-${type}`);
    const cardEl = document.getElementById(`card-${type}`);
    
    listContainer.innerHTML = "";
    
    const items = state.activeDayData[type] || [];
    countEl.textContent = `${items.length} / 5`;
    
    // Toggle limit class on card container
    cardEl.classList.toggle("limit-reached", items.length >= 5);
    
    if (items.length === 0) {
        const emptyMsg = document.createElement("li");
        emptyMsg.className = "list-empty-msg";
        if (type === 'gratitude') emptyMsg.textContent = "What are you grateful for today?";
        if (type === 'change') emptyMsg.textContent = "What is something you wish to improve?";
        if (type === 'tasks') emptyMsg.textContent = "No tasks listed for today.";
        if (type === 'tracker') emptyMsg.textContent = "No habits or actions being tracked today.";
        listContainer.appendChild(emptyMsg);
        return;
    }
    
    items.forEach((item, index) => {
        const itemWrapper = document.createElement("li");
        itemWrapper.className = "list-item-wrapper";
        
        // Number tag
        const numTag = document.createElement("span");
        numTag.className = "list-num";
        numTag.textContent = `${index + 1}.`;
        itemWrapper.appendChild(numTag);
        
        // Task checkbox (Tasks list only)
        if (type === 'tasks') {
            const checkboxContainer = document.createElement("div");
            checkboxContainer.className = "task-checkbox-container";
            checkboxContainer.innerHTML = `
                <div class="task-checkbox">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
            `;
            
            checkboxContainer.addEventListener("click", () => toggleTaskDone(index));
            itemWrapper.appendChild(checkboxContainer);
            
            if (item.done) {
                itemWrapper.classList.add("task-completed");
            }
        }

        // Tracker toggles (Tracker list only)
        if (type === 'tracker') {
            const togglesContainer = document.createElement("div");
            togglesContainer.className = "tracker-toggles";
            
            const isDone = item.status === 'done';
            const isFailed = item.status === 'failed';
            
            togglesContainer.innerHTML = `
                <button class="tracker-btn did-btn ${isDone ? 'active' : ''}" title="Did this">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12" /></svg>
                </button>
                <button class="tracker-btn didnot-btn ${isFailed ? 'active' : ''}" title="Did not do this">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            `;
            
            togglesContainer.querySelector(".did-btn").addEventListener("click", () => toggleTrackerStatus(index, 'done'));
            togglesContainer.querySelector(".didnot-btn").addEventListener("click", () => toggleTrackerStatus(index, 'failed'));
            
            itemWrapper.appendChild(togglesContainer);
            
            if (isDone) {
                itemWrapper.classList.add("tracker-done");
            } else if (isFailed) {
                itemWrapper.classList.add("tracker-failed");
            }
        }
        
        // Item text
        const textSpan = document.createElement("span");
        textSpan.className = "list-text";
        textSpan.textContent = (type === 'tasks' || type === 'tracker') ? item.text : item;
        itemWrapper.appendChild(textSpan);
        
        // Actions wrapper (Edit & Delete buttons)
        const actions = document.createElement("div");
        actions.className = "list-item-actions";
        
        // Edit button
        const editBtn = document.createElement("button");
        editBtn.className = "list-action-btn edit-action";
        editBtn.title = "Edit Item";
        editBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
        `;
        editBtn.addEventListener("click", () => openEditModal(type, index));
        actions.appendChild(editBtn);
        
        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "list-action-btn delete-action";
        deleteBtn.title = "Remove Item";
        deleteBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        `;
        deleteBtn.addEventListener("click", () => removeItem(type, index));
        actions.appendChild(deleteBtn);
        
        itemWrapper.appendChild(actions);
        listContainer.appendChild(itemWrapper);
    });
}

function addItem(type, inputElement) {
    const text = inputElement.value.trim();
    if (!text) return;
    
    const items = state.activeDayData[type] || [];
    if (items.length >= 5) {
        alert("You can list a maximum of 5 items.");
        return;
    }
    
    if (type === 'tasks') {
        items.push({ text: text, done: false });
    } else if (type === 'tracker') {
        items.push({ text: text, status: 'unset' });
    } else {
        items.push(text);
    }
    
    inputElement.value = "";
    saveActiveDayData();
    renderList(type);
}

function removeItem(type, index) {
    const items = state.activeDayData[type] || [];
    items.splice(index, 1);
    saveActiveDayData();
    renderList(type);
}

function toggleTaskDone(index) {
    const tasks = state.activeDayData.tasks || [];
    if (tasks[index]) {
        tasks[index].done = !tasks[index].done;
        saveActiveDayData();
        renderList('tasks');
    }
}

// --- Edit Modal Operations ---
function openEditModal(type, index) {
    state.editModal.type = type;
    state.editModal.index = index;
    
    const item = state.activeDayData[type][index];
    const val = (type === 'tasks' || type === 'tracker') ? item.text : item;
    state.editModal.value = val;
    
    const textarea = document.getElementById("modal-edit-textarea");
    textarea.value = val;
    
    const modal = document.getElementById("edit-modal");
    modal.classList.add("active");
    textarea.focus();
}

function closeEditModal() {
    const modal = document.getElementById("edit-modal");
    modal.classList.remove("active");
    state.editModal = { type: null, index: null, value: "" };
}

function saveEditModalChanges() {
    const { type, index } = state.editModal;
    if (type === null || index === null) return;
    
    const updatedVal = document.getElementById("modal-edit-textarea").value.trim();
    if (!updatedVal) return;
    
    if (type === 'tasks') {
        state.activeDayData.tasks[index].text = updatedVal;
    } else if (type === 'tracker') {
        state.activeDayData.tracker[index].text = updatedVal;
    } else {
        state.activeDayData[type][index] = updatedVal;
    }
    
    saveActiveDayData();
    renderList(type);
    closeEditModal();
}

// --- Social Battery Core System ---
function updateBatteryDisplay() {
    const base = state.activeDayData.batteryBase || 50;
    const logs = state.activeDayData.batteryLogs || [];
    
    // Sum offsets
    let total = base;
    logs.forEach(log => {
        total += log.value;
    });
    
    // Clamp to 0 - 100
    total = Math.max(0, Math.min(100, total));
    
    // Update visual elements
    const batteryFill = document.getElementById("battery-fill");
    const batteryPercentage = document.getElementById("battery-percentage");
    const batteryStatusTag = document.getElementById("battery-status-tag");
    
    batteryPercentage.textContent = `${total}%`;
    batteryFill.style.width = `${total}%`;
    
    // Calculate hue: red (0 deg) to green (120 deg)
    // Formula: HSL hue. Red is 0, yellow is 45-60, green is 120.
    const hue = Math.round(total * 1.25); // Scale 0-100 to 0-125
    batteryFill.style.background = `linear-gradient(90deg, hsl(0, 70%, 45%) 0%, hsl(${hue}, 70%, 45%) 100%)`;
    
    // Update text tag
    if (total <= 30) {
        batteryStatusTag.textContent = "Depleted Energy";
        batteryStatusTag.className = "battery-status-tag status-low";
    } else if (total <= 70) {
        batteryStatusTag.textContent = "Ambient Energy";
        batteryStatusTag.className = "battery-status-tag status-mid";
    } else {
        batteryStatusTag.textContent = "Charged Energy";
        batteryStatusTag.className = "battery-status-tag status-high";
    }

    // Update base controls in the view
    document.getElementById("battery-base-slider").value = base;
    document.getElementById("battery-base-value").textContent = base + "%";
    
    // Render the quick activity preset lists (including custom presets)
    renderActivityPresets();
    
    // Render the logged history list
    renderBatteryHistory();
}

function renderActivityPresets() {
    const chargersList = document.getElementById("chargers-preset-list");
    const drainersList = document.getElementById("drainers-preset-list");
    
    chargersList.innerHTML = "";
    drainersList.innerHTML = "";
    
    // 1. Build list of standard + custom presets
    const allChargers = [...DEFAULT_CHARGERS];
    const allDrainers = [...DEFAULT_DRAINERS];
    
    state.customPresets.forEach(preset => {
        if (preset.value >= 0) {
            allChargers.push(preset);
        } else {
            allDrainers.push(preset);
        }
    });
    
    // 2. Render Chargers
    allChargers.forEach(c => {
        const btn = document.createElement("button");
        btn.className = "activity-btn charge-btn";
        btn.innerHTML = `
            <span>${c.name}</span>
            <span class="activity-btn-val">+${c.value}%</span>
        `;
        btn.addEventListener("click", () => logActivity(c.name, c.value));
        chargersList.appendChild(btn);
    });
    
    // 3. Render Drainers
    allDrainers.forEach(d => {
        const btn = document.createElement("button");
        btn.className = "activity-btn drain-btn";
        btn.innerHTML = `
            <span>${d.name}</span>
            <span class="activity-btn-val">${d.value}%</span>
        `;
        btn.addEventListener("click", () => logActivity(d.name, d.value));
        drainersList.appendChild(btn);
    });
}

function renderBatteryHistory() {
    const logContainer = document.getElementById("activity-log-items");
    logContainer.innerHTML = "";
    
    const logs = state.activeDayData.batteryLogs || [];
    
    if (logs.length === 0) {
        logContainer.innerHTML = `
            <li class="log-empty-msg">No activities logged for this day yet. Click options above to log energy updates.</li>
        `;
        return;
    }
    
    // Render newest items at the top
    const reversedLogs = [...logs].reverse();
    
    reversedLogs.forEach((log, reversedIndex) => {
        const actualIndex = logs.length - 1 - reversedIndex;
        const item = document.createElement("li");
        item.className = "log-item";
        
        const isPos = log.value >= 0;
        const valText = isPos ? `+${log.value}%` : `${log.value}%`;
        const valClass = isPos ? 'positive' : 'negative';
        
        item.innerHTML = `
            <div class="log-item-details">
                <span class="log-item-time">${log.time}</span>
                <span class="log-item-name">${log.name}</span>
                <span class="log-item-value ${valClass}">${valText}</span>
            </div>
            <button class="btn-delete-log" title="Delete Log">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        `;
        
        item.querySelector(".btn-delete-log").addEventListener("click", () => deleteBatteryLog(actualIndex));
        logContainer.appendChild(item);
    });
}

function logActivity(name, value) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (!state.activeDayData.batteryLogs) {
        state.activeDayData.batteryLogs = [];
    }
    
    state.activeDayData.batteryLogs.push({
        time: timeStr,
        name: name,
        value: value
    });
    
    saveActiveDayData();
    updateBatteryDisplay();
}

function deleteBatteryLog(index) {
    if (state.activeDayData.batteryLogs && state.activeDayData.batteryLogs[index]) {
        state.activeDayData.batteryLogs.splice(index, 1);
        saveActiveDayData();
        updateBatteryDisplay();
    }
}

function clearBatteryLogs() {
    if (confirm("Are you sure you want to clear all energy log events for today?")) {
        state.activeDayData.batteryLogs = [];
        saveActiveDayData();
        updateBatteryDisplay();
    }
}

function handleCustomActivitySubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById("custom-activity-name");
    const valSelect = document.getElementById("custom-activity-value");
    
    const name = nameInput.value.trim();
    const val = parseInt(valSelect.value, 10);
    
    if (!name || isNaN(val)) return;
    
    // 1. Log the activity directly for today
    logActivity(name, val);
    
    // 2. Save it to customPresets so it displays as a persistent button!
    // Check if it already exists as a preset to avoid duplicates
    const exists = state.customPresets.some(preset => preset.name.toLowerCase() === name.toLowerCase());
    
    if (!exists) {
        state.customPresets.push({ name: name, value: val });
        localStorage.setItem("mindful_custom_presets", JSON.stringify(state.customPresets));
    }
    
    // Reset form inputs
    nameInput.value = "";
    valSelect.value = "";
    
    // Update display (renders presets and logs)
    updateBatteryDisplay();
}

// --- Daily Tracker Checklist Handler ---
function toggleTrackerStatus(index, statusType) {
    const tracker = state.activeDayData.tracker || [];
    if (tracker[index]) {
        const currentStatus = tracker[index].status;
        if (currentStatus === statusType) {
            tracker[index].status = 'unset';
        } else {
            tracker[index].status = statusType;
        }
        saveActiveDayData();
        renderList('tracker');
    }
}

// --- Nature Soundscape Audio System ---
let soundscapePreferences = {
    isPlaying: false,
    rain: 50,
    wind: 30,
    birds: 40,
    campfire: 50
};

function initSoundscape() {
    // Load preference from localStorage if it exists
    const stored = localStorage.getItem("mindful_soundscape_prefs");
    if (stored) {
        soundscapePreferences = JSON.parse(stored);
    }
    
    // Always start as stopped on load due to browser autoplay policies
    soundscapePreferences.isPlaying = false;
    
    // Sync UI Sliders and Volume numbers
    ['rain', 'wind', 'birds', 'campfire'].forEach(sound => {
        const slider = document.getElementById(`volume-${sound}`);
        const volTxt = document.getElementById(`vol-txt-${sound}`);
        const vol = soundscapePreferences[sound];
        
        if (slider) {
            slider.value = vol;
        }
        if (volTxt) {
            volTxt.textContent = vol + "%";
        }
        
        const audio = document.getElementById(`audio-${sound}`);
        if (audio) {
            audio.volume = vol / 100;
        }
    });

    // Update Master Play Icon state
    updateSoundscapePlayBtnUI();
}

function updateSoundscapePlayBtnUI() {
    const playBtn = document.getElementById("soundscape-play-btn");
    const playIcon = document.getElementById("soundscape-play-icon");
    const muteIcon = document.getElementById("soundscape-mute-icon");
    const statusLabel = document.getElementById("soundscape-status");
    const panel = document.getElementById("soundscape-panel");

    if (!playBtn) return;

    if (soundscapePreferences.isPlaying) {
        playIcon.classList.add("hidden");
        muteIcon.classList.remove("hidden");
        statusLabel.textContent = "Playing";
        statusLabel.className = "status-on";
        panel.style.borderColor = "rgba(94, 234, 212, 0.4)";
    } else {
        playIcon.classList.remove("hidden");
        muteIcon.classList.add("hidden");
        statusLabel.textContent = "Stopped";
        statusLabel.className = "status-off";
        panel.style.borderColor = "var(--border-glass)";
    }
}

function toggleSoundscape() {
    soundscapePreferences.isPlaying = !soundscapePreferences.isPlaying;
    
    const sounds = ['rain', 'wind', 'birds', 'campfire'];
    
    sounds.forEach(sound => {
        const audio = document.getElementById(`audio-${sound}`);
        if (audio) {
            if (soundscapePreferences.isPlaying) {
                // Play and handle promise for browser autoplay restriction block
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log(`Playback prevented for channel ${sound}:`, error);
                        soundscapePreferences.isPlaying = false;
                        updateSoundscapePlayBtnUI();
                        localStorage.setItem("mindful_soundscape_prefs", JSON.stringify(soundscapePreferences));
                    });
                }
            } else {
                audio.pause();
            }
        }
    });
    
    updateSoundscapePlayBtnUI();
    localStorage.setItem("mindful_soundscape_prefs", JSON.stringify(soundscapePreferences));
}

function toggleSoundscapeMixer() {
    const panel = document.getElementById("soundscape-panel");
    panel.classList.toggle("closed");
}

function updateChannelVolume(sound, volumeVal) {
    soundscapePreferences[sound] = volumeVal;
    
    // Update Slider text
    const volTxt = document.getElementById(`vol-txt-${sound}`);
    if (volTxt) {
        volTxt.textContent = volumeVal + "%";
    }
    
    // Update Audio element volume
    const audio = document.getElementById(`audio-${sound}`);
    if (audio) {
        audio.volume = volumeVal / 100;
        
        // If it's playing, make sure it is actually unmuted/playing
        if (soundscapePreferences.isPlaying && audio.paused) {
            audio.play().catch(e => console.log(e));
        }
    }
    
    localStorage.setItem("mindful_soundscape_prefs", JSON.stringify(soundscapePreferences));
}
