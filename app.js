const carsData = [
    {
        id: 1,
        name: "Toyota Fortuner Legender",
        brand: "Toyota",
        type: "Diesel",
        price: "43.66 Lakh",
        emi: "82,000",
        image: "https://images.unsplash.com/photo-1594502256191-496a798f5b84?auto=format&fit=crop&q=80&w=1000",
        gallery: [
            "https://images.unsplash.com/photo-1594502256191-496a798f5b84?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=1000"
        ],
        specs: { mileage: "10 kmpl", engine: "2755 cc", power: "201 bhp", seating: "7 Seater" },
        features: ["4x4 Capability", "Ventilated Seats", "JBL Premium Audio", "Wireless Charging", "Power Tailgate"]
    },
    {
        id: 2,
        name: "Mahindra Scorpio N",
        brand: "Mahindra",
        type: "Diesel",
        price: "24.05 Lakh",
        emi: "45,000",
        image: "https://images.unsplash.com/photo-1669023030485-573b6ac99761?auto=format&fit=crop&q=80&w=1000",
        gallery: [
            "https://images.unsplash.com/photo-1669023030485-573b6ac99761?auto=format&fit=crop&q=80&w=1000"
        ],
        specs: { mileage: "14 kmpl", engine: "2198 cc", power: "172 bhp", seating: "7 Seater" },
        features: ["Electric Sunroof", "Sony 3D Audio", "Alexa Enabled", "Multiple Drive Modes", "AdrenoX Connect"]
    },
    {
        id: 3,
        name: "BMW X5",
        brand: "BMW",
        type: "Petrol",
        price: "98.50 Lakh",
        emi: "1,85,000",
        image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=1000",
        gallery: [
            "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1616422285623-14ff49b25fde?auto=format&fit=crop&q=80&w=1000"
        ],
        specs: { mileage: "11 kmpl", engine: "2998 cc", power: "335 bhp", seating: "5 Seater" },
        features: ["Panoramic Sky Lounge", "Laserlight", "Air Suspension", "Bowers & Wilkins Diamond Surround", "Live Cockpit Professional"]
    },
    {
        id: 4,
        name: "Mercedes-Benz GLE",
        brand: "Mercedes",
        type: "Diesel",
        price: "96.40 Lakh",
        emi: "1,80,000",
        image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=1000",
        gallery: [
            "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=1000"
        ],
        specs: { mileage: "12 kmpl", engine: "2925 cc", power: "326 bhp", seating: "5 Seater" },
        features: ["MBUX Hyperscreen", "AIRMATIC Suspension", "Burmester Surround Sound", "Multibeam LED", "Active Parking Assist"]
    },
    {
        id: 5,
        name: "Land Rover Defender",
        brand: "Land Rover",
        type: "Petrol",
        price: "1.04 Crore",
        emi: "1,95,000",
        image: "https://images.unsplash.com/photo-1669287733654-e69e061dd314?auto=format&fit=crop&q=80&w=1000",
        gallery: [
            "https://images.unsplash.com/photo-1669287733654-e69e061dd314?auto=format&fit=crop&q=80&w=1000"
        ],
        specs: { mileage: "9 kmpl", engine: "2996 cc", power: "394 bhp", seating: "5/7 Seater" },
        features: ["Terrain Response 2", "Pivi Pro Infotainment", "ClearSight Rear View", "Meridian Sound System", "Matrix LED Headlights"]
    },
    {
        id: 6,
        name: "Audi Q7",
        brand: "Audi",
        type: "Petrol",
        price: "86.92 Lakh",
        emi: "1,65,000",
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000",
        gallery: [
            "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000"
        ],
        specs: { mileage: "11.2 kmpl", engine: "2995 cc", power: "335 bhp", seating: "7 Seater" },
        features: ["Quattro AWD", "Virtual Cockpit Plus", "Bang & Olufsen 3D Sound", "Matrix LED", "Adaptive Air Suspension"]
    }
];

// App State
let activePage = 'home';
let currentFilter = 'All';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Remove loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000);

    initNavigation();
    renderFeaturedCars();
    renderInventory();
    initFilters();
    initForms();
    initEMICalculator();
});

// Navigation Handling
function initNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            
            // Special case for car details
            if (targetPage.startsWith('detail-')) {
                const carId = parseInt(targetPage.split('-')[1]);
                openCarDetail(carId);
                return;
            }

            navigateTo(targetPage);
        });
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

function navigateTo(pageId) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetEl = document.getElementById(`${pageId}-page`);
    if (targetEl) {
        targetEl.classList.add('active');
        activePage = pageId;
    }
}

// Render Cars
function createCarCard(car) {
    return `
        <div class="glass rounded-2xl overflow-hidden hover-card flex flex-col h-full group border border-white/5 relative">
            <div class="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium z-10 border border-white/10">
                ${car.brand}
            </div>
            <div class="h-56 overflow-hidden relative">
                <img src="${car.image}" alt="${car.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-panel to-transparent opacity-80"></div>
            </div>
            <div class="p-6 flex flex-col flex-grow bg-panel relative -mt-4 rounded-t-2xl">
                <h3 class="text-xl font-bold font-display mb-1">${car.name}</h3>
                <p class="text-primary font-bold text-lg mb-4">₹ ${car.price}</p>
                
                <div class="grid grid-cols-2 gap-3 mb-6 text-sm text-gray-400">
                    <div class="flex items-center gap-2">
                        <i class="ph ph-engine text-lg text-gray-300"></i> ${car.specs.engine}
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="ph ph-gas-pump text-lg text-gray-300"></i> ${car.type}
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="ph ph-gauge text-lg text-gray-300"></i> ${car.specs.mileage}
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="ph ph-users text-lg text-gray-300"></i> ${car.specs.seating}
                    </div>
                </div>
                
                <div class="mt-auto flex gap-3">
                    <button onclick="openCarDetail(${car.id})" class="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-medium transition-colors text-sm">
                        View Details
                    </button>
                    <button onclick="navigateTo('contact')" class="flex-1 btn-primary py-3 rounded-xl font-medium text-white text-sm">
                        Test Drive
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderFeaturedCars() {
    const container = document.getElementById('featured-cars-grid');
    if (!container) return;
    
    // Show only first 3 cars as featured
    const featuredHTML = carsData.slice(0, 3).map(createCarCard).join('');
    container.innerHTML = featuredHTML;
}

function renderInventory() {
    const container = document.getElementById('inventory-grid');
    if (!container) return;
    
    let filteredCars = carsData;
    if (currentFilter !== 'All') {
        filteredCars = carsData.filter(car => car.brand === currentFilter);
    }
    
    if (filteredCars.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400">No vehicles found matching your criteria.</div>`;
        return;
    }
    
    container.innerHTML = filteredCars.map(createCarCard).join('');
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            filterBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'border-primary');
                b.classList.add('bg-white/5', 'text-gray-300', 'border-white/10');
            });
            
            const target = e.currentTarget;
            target.classList.remove('bg-white/5', 'text-gray-300', 'border-white/10');
            target.classList.add('bg-primary', 'text-white', 'border-primary');
            
            currentFilter = target.getAttribute('data-filter');
            renderInventory();
        });
    });
}

// Car Detail Page
function openCarDetail(carId) {
    const car = carsData.find(c => c.id === carId);
    if (!car) return;
    
    // Populate Detail Page
    document.getElementById('detail-image').src = car.image;
    document.getElementById('detail-name').textContent = car.name;
    document.getElementById('detail-price').textContent = `₹ ${car.price}`;
    document.getElementById('detail-emi').textContent = `EMI from ₹ ${car.emi}/month`;
    
    // Specs
    document.getElementById('spec-engine').textContent = car.specs.engine;
    document.getElementById('spec-power').textContent = car.specs.power;
    document.getElementById('spec-mileage').textContent = car.specs.mileage;
    document.getElementById('spec-type').textContent = car.type;
    
    // Features list
    const featuresList = document.getElementById('detail-features');
    featuresList.innerHTML = car.features.map(f => `
        <li class="flex items-center gap-3 text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5">
            <i class="ph-fill ph-check-circle text-primary text-xl"></i>
            ${f}
        </li>
    `).join('');
    
    navigateTo('detail');
}

// Forms
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="ph ph-spinner animate-spin text-xl"></i> Sending...';
            btn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="ph-fill ph-check-circle text-xl"></i> Sent Successfully';
                btn.classList.add('bg-green-600');
                btn.classList.remove('btn-primary');
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.remove('bg-green-600');
                    btn.classList.add('btn-primary');
                }, 3000);
            }, 1500);
        });
    });
}

// EMI Calculator
function initEMICalculator() {
    const amountInput = document.getElementById('emi-amount');
    const rateInput = document.getElementById('emi-rate');
    const tenureInput = document.getElementById('emi-tenure');
    const resultEl = document.getElementById('emi-result');
    
    if (!amountInput || !rateInput || !tenureInput || !resultEl) return;
    
    const calculateEMI = () => {
        const p = parseFloat(amountInput.value);
        const r = parseFloat(rateInput.value) / 12 / 100;
        const n = parseFloat(tenureInput.value) * 12;
        
        if (p && r && n) {
            const emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
            resultEl.textContent = `₹ ${Math.round(emi).toLocaleString('en-IN')}`;
        } else {
            resultEl.textContent = '₹ 0';
        }
    };
    
    [amountInput, rateInput, tenureInput].forEach(input => {
        input.addEventListener('input', calculateEMI);
    });
    
    calculateEMI(); // Initial calc
}
