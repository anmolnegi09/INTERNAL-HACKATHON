// The 'defer' attribute in the HTML script tag ensures this code runs after the document is parsed.
// However, using DOMContentLoaded is still a robust practice.
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const tripForm = document.getElementById('trip-form');
    const plannerSection = document.getElementById('planner-section');
    const resultsSection = document.getElementById('results-section');
    const budgetInput = document.getElementById('budget');
    const budgetValue = document.getElementById('budget-value');
    const formError = document.getElementById('form-error');
    const newPlanBtn = document.getElementById('new-plan-btn');

    // --- EXPANDED MOCK DATA ---
    // This object contains data for a wider variety of cities in Uttar Pradesh.
    const travelData = {
        Agra: {
            name: "Agra",
            itinerary: [
                { day: 1, title: 'Taj Mahal & Agra Fort', desc: 'Witness the breathtaking Taj Mahal at sunrise. Later, explore the massive and historic Agra Fort, a UNESCO World Heritage site.' },
                { day: 2, title: 'Fatehpur Sikri & Local Cuisine', desc: 'Take a day trip to Fatehpur Sikri, the abandoned Mughal capital. In the evening, savor the famous Mughlai cuisine and the sweet Petha of Agra.' }
            ],
            travel: { bus: '4-5 hours, ~₹500', train: '2-3 hours, ~₹300 (Chair Car)', flight: 'To Delhi, then drive' },
            stay: [ { type: 'Hostel', cost: '₹500 - ₹900' }, { type: 'Mid-range Hotel', cost: '₹1500 - ₹4000' } ],
            food: [ { name: 'Petha', img: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Petha' }, { name: 'Mughlai Cuisine', img: 'https://placehold.co/400x300/ec4899/FFFFFF?text=Mughlai' } ],
            safety: ['Book Taj Mahal tickets online to avoid long queues.', 'Be wary of unlicensed guides.', 'Note: Taj Mahal is closed on Fridays.'],
            emergency: { police: '112', ambulance: '102' },
            phrases: [ { hi: 'Namaste', en: 'Hello' }, { hi: 'Shukriya', en: 'Thank you' } ]
        },
        Varanasi: {
            name: 'Varanasi',
            itinerary: [
                { day: 1, title: 'Arrival & Ghats Exploration', desc: 'Arrive in Varanasi. In the evening, witness the magical Ganga Aarti at Dashashwamedh Ghat and take a boat ride.' },
                { day: 2, title: 'Temples & Sarnath', desc: 'Visit the revered Kashi Vishwanath Temple in the morning. Later, take a trip to Sarnath, where Buddha gave his first sermon.' },
                { day: 3, title: 'Local Culture & Departure', desc: 'Explore the bustling local markets for silk sarees and handicrafts. Enjoy street food like Kachori Sabzi and Lassi.' }
            ],
            travel: { bus: '12-14 hours, ~₹1000', train: '8-10 hours, ~₹600 (Sleeper)', flight: '1.5 hours, ~₹3000+' },
            stay: [ { type: 'Hostel', cost: '₹400 - ₹800' }, { type: 'Riverside Hotel', cost: '₹3000+' } ],
            food: [ { name: 'Kachori Sabzi', img: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Kachori' }, { name: 'Lassi', img: 'https://placehold.co/400x300/ec4899/FFFFFF?text=Lassi' } ],
            safety: ['Be cautious of touts at ghats.', 'Bargain respectfully in markets.', 'Keep belongings secure in crowded areas.'],
            emergency: { police: '112', ambulance: '102' },
            phrases: [ { hi: 'Har Har Mahadev', en: 'A spiritual greeting' }, { hi: 'Dhanyavaad', en: 'Thank you' } ]
        },
        Lucknow: {
            name: 'Lucknow',
            itinerary: [
                { day: 1, title: 'Historical Marvels', desc: 'Explore the architectural wonders of Bara Imambara (and its Bhulbhulaiya) and Chota Imambara. Stroll through the historic British Residency ruins.' },
                { day: 2, title: 'Culture, Shopping & Food', desc: 'Experience Hazratganj for shopping and enjoy a cultural evening. Indulge in the world-famous Awadhi cuisine, especially Tunday Kebabs and Biryani.' }
            ],
            travel: { bus: '8-10 hours, ~₹800', train: '6-8 hours, ~₹500 (Sleeper)', flight: '1 hour, ~₹2000+' },
            stay: [ { type: 'Guesthouse', cost: '₹800 - ₹1500' }, { type: 'Business Hotel', cost: '₹2000 - ₹4500' } ],
            food: [ { name: 'Tunday Kebab', img: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Kebab' }, { name: 'Lucknawi Biryani', img: 'https://placehold.co/400x300/ec4899/FFFFFF?text=Biryani' } ],
            safety: ['Bargain while shopping in local markets.', 'Traffic can be heavy; plan travel accordingly.'],
            emergency: { police: '112', ambulance: '108' },
            phrases: [ { hi: 'Aadaab', en: 'A respectful greeting' }, { hi: 'Shukriya', en: 'Thank you' } ]
        },
        Mathura: {
            name: "Mathura & Vrindavan",
            itinerary: [
                { day: 1, title: 'Arrival & Krishna Janmabhoomi', desc: 'Arrive in Mathura, the birthplace of Lord Krishna. Visit the Shri Krishna Janmabhoomi temple. In the evening, witness the serene Yamuna Aarti at Vishram Ghat.' },
                { day: 2, title: 'Vrindavan Exploration', desc: 'Travel to Vrindavan. Visit the famous Banke Bihari Temple, the magnificent Prem Mandir, and the ISKCON temple. Be cautious of the playful monkeys!' }
            ],
            travel: { bus: '3-4 hours, ~₹400', train: '2-3 hours, ~₹200 (Chair Car)', flight: 'Not available' },
            stay: [ { type: 'Ashram/Guesthouse', cost: '₹500 - ₹1000' }, { type: 'Budget Hotel', cost: '₹1200 - ₹3000' } ],
            food: [ { name: 'Mathura ke Pede', img: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Pede' }, { name: 'Aloo Puri', img: 'https://placehold.co/400x300/ec4899/FFFFFF?text=Aloo+Puri' } ],
            safety: ['Be cautious of monkeys in Vrindavan.', 'Dress modestly, especially when visiting temples.'],
            emergency: { police: '112', ambulance: '108' },
            phrases: [ { hi: 'Radhe Radhe', en: 'A common greeting' }, { hi: 'Dhanyavaad', en: 'Thank you' } ]
        },
        Ayodhya: {
            name: 'Ayodhya',
            itinerary: [
                { day: 1, title: 'Ram Janmabhoomi & Saryu Aarti', desc: 'Visit the grand Ram Janmabhoomi temple. Explore other sites like Hanuman Garhi. In the evening, experience the divine Saryu river Aarti.' },
                { day: 2, title: 'Kanak Bhawan & Local Sites', desc: 'Visit Kanak Bhawan, believed to be a palace gifted to Sita. Explore other local temples and ghats along the Saryu river.' }
            ],
            travel: { bus: '10-12 hours, ~₹900', train: '7-9 hours, ~₹550 (Sleeper)', flight: 'To Lucknow, then 3hr drive' },
            stay: [ { type: 'Dharamshala', cost: '₹300 - ₹700' }, { type: 'Budget Hotel', cost: '₹1500 - ₹3000' } ],
            food: [ { name: 'Tehri (Veg Pulao)', img: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Tehri' }, { name: 'Besan Ladoo', img: 'https://placehold.co/400x300/ec4899/FFFFFF?text=Ladoo' } ],
            safety: ['Book accommodation in advance, especially during festivals.', 'Respect the religious sanctity of the place.'],
            emergency: { police: '112', ambulance: '108' },
            phrases: [ { hi: 'Jai Shri Ram', en: 'A spiritual greeting' }, { hi: 'Dhanyavaad', en: 'Thank you' } ]
        },
        Prayagraj: {
            name: 'Prayagraj',
            itinerary: [
                { day: 1, title: 'Triveni Sangam & Fort', desc: 'Visit the Triveni Sangam, the confluence of Ganga, Yamuna, and Saraswati rivers. Take a holy dip. Later, visit the massive Allahabad Fort.' },
                { day: 2, title: 'Anand Bhavan & Temples', desc: 'Explore Anand Bhavan, the ancestral home of the Nehru family. Visit other sites like the All Saints Cathedral and Hanuman Mandir.' }
            ],
            travel: { bus: '11-13 hours, ~₹950', train: '7-9 hours, ~₹500 (Sleeper)', flight: 'Direct flights available' },
            stay: [ { type: 'Guesthouse', cost: '₹800 - ₹1500' }, { type: 'Mid-range Hotel', cost: '₹1800 - ₹4000' } ],
            food: [ { name: 'Kachori & Sabzi', img: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Kachori' }, { name: 'Chaat', img: 'https://placehold.co/400x300/ec4899/FFFFFF?text=Chaat' } ],
            safety: ['Be careful of strong currents at the Sangam.', 'Negotiate boat prices before hiring.'],
            emergency: { police: '112', ambulance: '108' },
            phrases: [ { hi: 'Namaste', en: 'Hello' }, { hi: 'Dhanyavaad', en: 'Thank you' } ]
        },
        Jhansi: {
            name: 'Jhansi',
            itinerary: [
                { day: 1, title: 'Jhansi Fort & Museum', desc: 'Explore the historic Jhansi Fort, a symbol of bravery. Visit the Government Museum to see artifacts from the Bundelkhand region.' },
                { day: 2, title: 'Day trip to Orchha', desc: 'Take a short trip to Orchha (in MP, but very close), known for its magnificent palaces, temples, and cenotaphs by the Betwa river.' }
            ],
            travel: { bus: '8-10 hours, ~₹700', train: '5-6 hours, ~₹400 (Sleeper)', flight: 'To Gwalior, then drive' },
            stay: [ { type: 'Budget Hotel', cost: '₹1000 - ₹2500' }, { type: 'Mid-range Hotel', cost: '₹2500 - ₹4500' } ],
            food: [ { name: 'Bundeli Cuisine', img: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Thali' }, { name: 'Raita', img: 'https://placehold.co/400x300/ec4899/FFFFFF?text=Raita' } ],
            safety: ['Plan your day trips in advance.', 'Stay hydrated, as the region can get very hot.'],
            emergency: { police: '112', ambulance: '108' },
            phrases: [ { hi: 'Ram Ram', en: 'A local greeting' }, { hi: 'Dhanyavaad', en: 'Thank you' } ]
        },
         Chitrakoot: {
            name: 'Chitrakoot',
            itinerary: [
                { day: 1, title: 'Ramghat & Kamadgiri', desc: 'Visit Ramghat on the Mandakini river for a boat ride and evening aarti. Perform Parikrama around the holy Kamadgiri hill.' },
                { day: 2, title: 'Gupt Godavari & Sati Anusuya Ashram', desc: 'Explore the mystical Gupt Godavari caves and visit the serene Sati Anusuya Ashram, surrounded by nature.' }
            ],
            travel: { bus: 'From Prayagraj/Jhansi', train: 'Chitrakoot Dham Karwi (CKTD)', flight: 'To Prayagraj, then drive' },
            stay: [ { type: 'Ashram', cost: '₹400 - ₹800' }, { type: 'Budget Hotel', cost: '₹1000 - ₹2000' } ],
            food: [ { name: 'Vegetarian Thali', img: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Thali' }, { name: 'Sweets', img: 'https://placehold.co/400x300/ec4899/FFFFFF?text=Sweets' } ],
            safety: ['It\'s a religious town, dress conservatively.', 'Carry cash as digital payments may not be widely accepted.'],
            emergency: { police: '112', ambulance: '108' },
            phrases: [ { hi: 'Jai Siya Ram', en: 'A spiritual greeting' }, { hi: 'Dhanyavaad', en: 'Thank you' } ]
        },
        Sarnath: {
            name: 'Sarnath',
            itinerary: [
                { day: 1, title: 'Stupas & Temples', desc: 'Visit Dhamek Stupa, where Buddha gave his first sermon. Explore Chaukhandi Stupa and the Mulagandha Kuti Vihara temple.' },
                { day: 2, title: 'Museum & Monastery', desc: 'Explore the Sarnath Archeological Museum which houses the Lion Capital of Ashoka. Visit the peaceful Thai Temple and Monastery.' }
            ],
            travel: { bus: 'Very close to Varanasi (30 min)', train: 'To Varanasi Junction', flight: 'To Varanasi Airport' },
            stay: [ { type: 'Monastery Guesthouse', cost: '₹500 - ₹1200' }, { type: 'Hotel in Varanasi', cost: 'Varies' } ],
            food: [ { name: 'Local Eateries', img: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Food' }, { name: 'Sweets', img: 'https://placehold.co/400x300/ec4899/FFFFFF?text=Sweets' } ],
            safety: ['Best visited as a day trip from Varanasi.', 'Hire a guide for a better historical understanding.'],
            emergency: { police: '112', ambulance: '102' },
            phrases: [ { hi: 'Namaste', en: 'Hello' }, { hi: 'Dhanyavaad', en: 'Thank you' } ]
        },
        Kushinagar: {
            name: 'Kushinagar',
            itinerary: [
                { day: 1, title: 'Mahaparinirvana Temple', desc: 'Visit the Mahaparinirvana Temple, which houses a 6-meter long statue of the reclining Buddha, marking the spot where he passed away.' },
                { day: 2, title: 'Ramabhar Stupa & Monasteries', desc: 'Visit Ramabhar Stupa, the cremation site of Lord Buddha. Explore the various international Buddhist monasteries built by different countries.' }
            ],
            travel: { bus: 'From Gorakhpur (1.5 hours)', train: 'To Gorakhpur Junction', flight: 'Direct flights to Kushinagar' },
            stay: [ { type: 'Monastery Guesthouse', cost: '₹600 - ₹1500' }, { type: 'Budget Hotel', cost: '₹1200 - ₹2500' } ],
            food: [ { name: 'Local Vegetarian Food', img: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Food' }, { name: 'Regional Snacks', img: 'https://placehold.co/400x300/ec4899/FFFFFF?text=Snacks' } ],
            safety: ['This is a key Buddhist pilgrimage site; maintain decorum.', 'Plan your travel from Gorakhpur if not flying directly.'],
            emergency: { police: '112', ambulance: '108' },
            phrases: [ { hi: 'Namaste', en: 'Hello' }, { hi: 'Dhanyavaad', en: 'Thank you' } ]
        }
    };

    // --- EVENT LISTENERS ---

    // Handle the main form submission
    tripForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        formError.classList.add('hidden'); 

        const destination = document.getElementById('destination').value;
        const days = document.getElementById('days').value;
        const groupSize = document.getElementById('group-size').value;
        const budget = budgetInput.value;

        // Basic Validation
        if (!destination || !days || !groupSize) {
            formError.textContent = 'Please fill out all the required fields.';
            formError.classList.remove('hidden');
            return;
        }

        displayResults({ destination, days, budget, groupSize });
    });

    // Update budget display as slider moves
    budgetInput.addEventListener('input', (e) => {
        budgetValue.textContent = `₹${parseInt(e.target.value).toLocaleString('en-IN')}`;
    });

    // Handle "New Plan" button click
    newPlanBtn.addEventListener('click', () => {
        resultsSection.classList.add('hidden');
        plannerSection.classList.remove('hidden');
        newPlanBtn.classList.add('hidden');
        tripForm.reset();
        budgetValue.textContent = `₹${parseInt(budgetInput.value).toLocaleString('en-IN')}`;
        window.scrollTo(0, 0);
    });

    // --- CORE FUNCTION ---
    function displayResults(details) {
        const data = travelData[details.destination];
        if (!data) return;

        const dailyBudget = Math.round(details.budget / details.days);

        const resultsHTML = `
            <div class="fade-in text-center mb-6">
                <h2 class="text-3xl md:text-4xl font-bold text-teal-700">Your Trip to ${data.name}</h2>
                <p class="mt-2 text-gray-600">A ${details.days}-day plan for ${details.groupSize} people.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-lg fade-in" style="animation-delay: 0.1s;">
                <h3 class="text-2xl font-bold mb-4">🗓️ Day-wise Itinerary</h3>
                <div class="space-y-4">
                    ${data.itinerary.slice(0, details.days).map(item => `
                        <div class="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                            <h4 class="font-bold text-teal-800">Day ${item.day}: ${item.title}</h4>
                            <p class="text-gray-600">${item.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-2xl shadow-lg fade-in" style="animation-delay: 0.2s;">
                    <h3 class="text-2xl font-bold mb-4">💰 Budget Breakdown</h3>
                    <ul class="space-y-3 text-sm">
                        <li class="flex justify-between items-center font-semibold"><span>Total (Per Person)</span><span class="text-teal-700">₹${parseInt(details.budget).toLocaleString('en-IN')}</span></li>
                        <li class="flex justify-between items-center font-semibold border-b pb-2"><span>Daily Approx. (Per Person)</span><span class="text-teal-700">₹${dailyBudget.toLocaleString('en-IN')}</span></li>
                        <li class="flex justify-between items-center"><span>🏨 Stay (40%)</span><span>~₹${Math.round(dailyBudget * 0.4).toLocaleString('en-IN')}</span></li>
                        <li class="flex justify-between items-center"><span>🍜 Food (30%)</span><span>~₹${Math.round(dailyBudget * 0.3).toLocaleString('en-IN')}</span></li>
                        <li class="flex justify-between items-center"><span>🚌 Local Travel/Activities (30%)</span><span>~₹${Math.round(dailyBudget * 0.3).toLocaleString('en-IN')}</span></li>
                    </ul>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-lg fade-in" style="animation-delay: 0.3s;">
                    <h3 class="text-2xl font-bold mb-4">🏨 Stay & Travel Options</h3>
                    <div class="space-y-4 text-sm">
                        <div>
                            <h4 class="font-semibold">Stay Suggestions</h4>
                            <ul class="list-disc list-inside">${data.stay.map(s => `<li><strong>${s.type}:</strong> ${s.cost}</li>`).join('')}</ul>
                        </div>
                        <div>
                            <h4 class="font-semibold">Travel from Delhi (Approx.)</h4>
                            <p><strong>Bus:</strong> ${data.travel.bus} | <strong>Train:</strong> ${data.travel.train}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-lg fade-in" style="animation-delay: 0.4s;">
                <h3 class="text-2xl font-bold mb-4">🍜 Must-Try Local Food</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    ${data.food.map(f => `
                        <div class="text-center">
                            <img src="${f.img}" alt="${f.name}" class="w-full h-24 object-cover rounded-lg shadow-md mb-2 bg-gray-200">
                            <p class="font-medium text-sm">${f.name}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-2xl shadow-lg fade-in" style="animation-delay: 0.5s;">
                    <h3 class="text-2xl font-bold mb-4">🛡️ Safety & Contacts</h3>
                    <ul class="list-disc list-inside text-gray-700 space-y-1 text-sm">
                        ${data.safety.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                    <p class="text-sm mt-4 pt-3 border-t"><strong>Emergency:</strong> Police ${data.emergency.police} | Ambulance ${data.emergency.ambulance}</p>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-lg fade-in" style="animation-delay: 0.6s;">
                    <h3 class="text-2xl font-bold mb-4">🗣️ Quick Local Phrases</h3>
                    <ul class="space-y-2 text-sm">
                        ${data.phrases.map(p => `<li class="flex justify-between"><strong>${p.hi}</strong> <span class="text-gray-500">${p.en}</span></li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        resultsSection.innerHTML = resultsHTML;

        plannerSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        newPlanBtn.classList.remove('hidden');
        window.scrollTo(0, 0); 
    }
});
