// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
    performSearch(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
    }
});

function performSearch(query) {
    // Search implementation will go here
    console.log('Searching for:', query);
}

// Sidebar navigation
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Here you would typically handle navigation/routing
        const section = link.getAttribute('href').substring(1);
        console.log('Navigating to:', section);
    });
});

// Sample data updates (for demonstration)
function updateStats() {
    const stats = {
        employees: Math.floor(Math.random() * 50) + 20,
        projects: Math.floor(Math.random() * 20) + 10,
        tasks: Math.floor(Math.random() * 100) + 40,
        hours: Math.floor(Math.random() * 200) + 150
    };

    document.querySelectorAll('.stat-card').forEach(card => {
        const statType = card.querySelector('h3').textContent.toLowerCase();
        const statValue = card.querySelector('p');
        if (stats[statType]) {
            statValue.textContent = stats[statType];
        }
    });
}

// Update stats every 5 minutes
setInterval(updateStats, 300000);

// Add new activity
function addNewActivity(activity) {
    const activityList = document.querySelector('.activity-list');
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    activityItem.innerHTML = `
        <div class="activity-icon"><i class="fas fa-bell"></i></div>
        <div class="activity-details">
            <p>${activity}</p>
            <small>Hozirgina</small>
        </div>
    `;
    
    activityList.insertBefore(activityItem, activityList.firstChild);
    
    // Remove oldest activity if more than 5
    if (activityList.children.length > 5) {
        activityList.removeChild(activityList.lastChild);
    }
}

// Employees Section Functionality
const addEmployeeBtn = document.querySelector('.add-employee-btn');
const employeeFilter = document.querySelector('.employee-filter select');
const employeesGrid = document.querySelector('.employees-grid');

// Add new employee form handler
addEmployeeBtn.addEventListener('click', () => {
    // Bu yerda yangi xodim qo'shish modali ochiladi
    showAddEmployeeModal();
});

function showAddEmployeeModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Yangi xodim qo'shish</h2>
            <form id="add-employee-form">
                <div class="form-group">
                    <label>Ism Familiya</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Lavozim</label>
                    <input type="text" name="position" required>
                </div>
                <div class="form-group">
                    <label>Bo'lim</label>
                    <select name="department" required>
                        <option value="development">Dasturlash</option>
                        <option value="marketing">Marketing</option>
                        <option value="sales">Sotuvlar</option>
                        <option value="hr">HR</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Telefon</label>
                    <input type="tel" name="phone" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">Saqlash</button>
                    <button type="button" class="cancel-btn">Bekor qilish</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Modal events
    const form = modal.querySelector('form');
    const cancelBtn = modal.querySelector('.cancel-btn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        addNewEmployee(Object.fromEntries(formData));
        document.body.removeChild(modal);
    });
    
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

function addNewEmployee(employeeData) {
    const employeeCard = document.createElement('div');
    employeeCard.className = 'employee-card';
    employeeCard.innerHTML = `
        <div class="employee-header">
            <img src="https://via.placeholder.com/150" alt="Employee">
            <div class="employee-status active"></div>
        </div>
        <div class="employee-info">
            <h3>${employeeData.name}</h3>
            <p class="position">${employeeData.position}</p>
            <p class="department"><i class="fas fa-briefcase"></i> ${employeeData.department}</p>
            <p class="email"><i class="fas fa-envelope"></i> ${employeeData.email}</p>
            <p class="phone"><i class="fas fa-phone"></i> ${employeeData.phone}</p>
        </div>
        <div class="employee-actions">
            <button class="edit-btn"><i class="fas fa-edit"></i></button>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;
    
    employeesGrid.appendChild(employeeCard);
    
    // Add event listeners for edit and delete buttons
    const editBtn = employeeCard.querySelector('.edit-btn');
    const deleteBtn = employeeCard.querySelector('.delete-btn');
    
    editBtn.addEventListener('click', () => editEmployee(employeeCard));
    deleteBtn.addEventListener('click', () => deleteEmployee(employeeCard));
}

function editEmployee(employeeCard) {
    const employeeInfo = employeeCard.querySelector('.employee-info');
    const name = employeeInfo.querySelector('h3').textContent;
    const position = employeeInfo.querySelector('.position').textContent;
    const department = employeeInfo.querySelector('.department').textContent.split(' ').pop();
    const email = employeeInfo.querySelector('.email').textContent.split(' ').pop();
    const phone = employeeInfo.querySelector('.phone').textContent.split(' ').pop();
    
    // Show edit modal with current values
    showEditEmployeeModal({name, position, department, email, phone}, employeeCard);
}

function showEditEmployeeModal(employeeData, employeeCard) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Xodim ma'lumotlarini tahrirlash</h2>
            <form id="edit-employee-form">
                <div class="form-group">
                    <label>Ism Familiya</label>
                    <input type="text" name="name" value="${employeeData.name}" required>
                </div>
                <div class="form-group">
                    <label>Lavozim</label>
                    <input type="text" name="position" value="${employeeData.position}" required>
                </div>
                <div class="form-group">
                    <label>Bo'lim</label>
                    <select name="department" required>
                        <option value="development" ${employeeData.department === 'Dasturlash bo\'limi' ? 'selected' : ''}>Dasturlash</option>
                        <option value="marketing" ${employeeData.department === 'Marketing bo\'limi' ? 'selected' : ''}>Marketing</option>
                        <option value="sales" ${employeeData.department === 'Sotuvlar bo\'limi' ? 'selected' : ''}>Sotuvlar</option>
                        <option value="hr" ${employeeData.department === 'HR bo\'limi' ? 'selected' : ''}>HR</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value="${employeeData.email}" required>
                </div>
                <div class="form-group">
                    <label>Telefon</label>
                    <input type="tel" name="phone" value="${employeeData.phone}" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">Saqlash</button>
                    <button type="button" class="cancel-btn">Bekor qilish</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Modal events
    const form = modal.querySelector('form');
    const cancelBtn = modal.querySelector('.cancel-btn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        updateEmployee(employeeCard, Object.fromEntries(formData));
        document.body.removeChild(modal);
    });
    
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

function updateEmployee(employeeCard, employeeData) {
    const employeeInfo = employeeCard.querySelector('.employee-info');
    employeeInfo.querySelector('h3').textContent = employeeData.name;
    employeeInfo.querySelector('.position').textContent = employeeData.position;
    employeeInfo.querySelector('.department').innerHTML = `<i class="fas fa-briefcase"></i> ${employeeData.department}`;
    employeeInfo.querySelector('.email').innerHTML = `<i class="fas fa-envelope"></i> ${employeeData.email}`;
    employeeInfo.querySelector('.phone').innerHTML = `<i class="fas fa-phone"></i> ${employeeData.phone}`;
}

function deleteEmployee(employeeCard) {
    if (confirm('Rostdan ham bu xodimni o\'chirmoqchimisiz?')) {
        employeeCard.remove();
    }
}

// Filter employees by department
employeeFilter.addEventListener('change', (e) => {
    const department = e.target.value;
    const employeeCards = document.querySelectorAll('.employee-card');
    
    employeeCards.forEach(card => {
        const cardDepartment = card.querySelector('.department').textContent;
        if (department === 'all' || cardDepartment.includes(department)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Hodimlar ro'yxati
let employees = [];

// Modal elementlarini olish
const modal = document.getElementById('employeeModal');
const addEmployeeBtn = document.querySelector('.add-employee-btn');
const employeeForm = document.getElementById('employeeForm');
const employeesList = document.querySelector('.employees-list');
const cancelBtn = document.querySelector('.cancel-btn');

// Modalni ochish
addEmployeeBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Modalni yopish
cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    employeeForm.reset();
});

// Modal tashqarisini bosganda yopish
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        employeeForm.reset();
    }
});

// Hodim qo'shish
employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const employee = {
        id: Date.now(),
        name: document.getElementById('employeeName').value,
        position: document.getElementById('employeePosition').value,
        phone: document.getElementById('employeePhone').value
    };
    
    employees.push(employee);
    displayEmployees();
    modal.style.display = 'none';
    employeeForm.reset();
});

// Hodimni o'chirish
function deleteEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    displayEmployees();
}

// Hodimlarni ko'rsatish
function displayEmployees() {
    employeesList.innerHTML = '';
    employees.forEach(emp => {
        const employeeCard = document.createElement('div');
        employeeCard.className = 'employee-card';
        employeeCard.innerHTML = `
            <div class="employee-info">
                <h4>${emp.name}</h4>
                <p>${emp.position}</p>
                <p>${emp.phone}</p>
            </div>
            <button class="delete-btn" onclick="deleteEmployee(${emp.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        employeesList.appendChild(employeeCard);
    });
}

// Initialize Chart
const ctx = document.getElementById('monthlyStats').getContext('2d');
const monthlyStats = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun'],
        datasets: [{
            label: 'Loyihalar',
            data: [12, 19, 15, 17, 14, 13],
            borderColor: '#3498db',
            tension: 0.4,
            fill: false
        }, {
            label: 'Vazifalar',
            data: [30, 45, 38, 42, 35, 40],
            borderColor: '#2ecc71',
            tension: 0.4,
            fill: false
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Initialize Calendar
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            {
                title: 'Loyiha taqdimoti',
                start: '2024-12-10T14:00:00',
                end: '2024-12-10T15:00:00',
                backgroundColor: '#3498db'
            },
            {
                title: 'Xodimlar trenigi',
                start: '2024-12-10T15:30:00',
                end: '2024-12-10T17:00:00',
                backgroundColor: '#2ecc71'
            },
            {
                title: 'Haftalik yig\'ilish',
                start: '2024-12-11T10:00:00',
                end: '2024-12-11T11:30:00',
                backgroundColor: '#e74c3c'
            }
        ],
        locale: 'uz',
        buttonText: {
            today: 'Bugun',
            month: 'Oy',
            week: 'Hafta',
            day: 'Kun'
        }
    });
    calendar.render();
});

// Initialize tooltips and other UI elements
document.addEventListener('DOMContentLoaded', () => {
    console.log('Application initialized');
    // Add any initialization code here
});
