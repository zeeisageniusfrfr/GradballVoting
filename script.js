document.addEventListener('DOMContentLoaded', function() {
    const curtainOverlay = document.getElementById('curtain-overlay');
    const mainContent = document.getElementById('main-content');
    const curtainPull = document.querySelector('.curtain-pull');
    const backgroundMusic = document.getElementById('background-music');
    const nameInput = document.getElementById('name-input');
    const nameSuggestionsDropdown = document.getElementById('name-suggestions');
    const selectNameBtn = document.getElementById('select-name-btn');
    const loginInterface = document.getElementById('login-interface');
    const votingContent = document.querySelector('.voting-content');
    const adminContent = document.querySelector('.admin-content');
    
    // Admin elements
    const userLoginBtn = document.getElementById('user-login-btn');
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const userLoginForm = document.getElementById('user-login-form');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminPassword = document.getElementById('admin-password');
    const adminLoginSubmit = document.getElementById('admin-login-submit');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    
    // Voting results elements
    const promKingCandidates = document.getElementById('prom-king-candidates');
    const promQueenCandidates = document.getElementById('prom-queen-candidates');
    const bestDressedMaleCandidates = document.getElementById('best-dressed-male-candidates');
    const bestDressedFemaleCandidates = document.getElementById('best-dressed-female-candidates');
    
    // Admin results elements
    const promKingResults = document.getElementById('prom-king-results');
    const promQueenResults = document.getElementById('prom-queen-results');
    const bestDressedMaleResults = document.getElementById('best-dressed-male-results');
    const bestDressedFemaleResults = document.getElementById('best-dressed-female-results');
    
    // Reset button
    const resetVotesBtn = document.getElementById('reset-votes-btn');
    
    // Voting action buttons
    const submitVotesBtn = document.getElementById('submit-votes-btn');
    const voterLogoutBtn = document.getElementById('voter-logout-btn');
    
    // Voting search inputs
    const promKingSearch = document.getElementById('prom-king-search');
    const promKingSuggestions = document.getElementById('prom-king-suggestions');
    const promQueenSearch = document.getElementById('prom-queen-search');
    const promQueenSuggestions = document.getElementById('prom-queen-suggestions');
    const bestDressedMaleSearch = document.getElementById('best-dressed-male-search');
    const bestDressedMaleSuggestions = document.getElementById('best-dressed-male-suggestions');
    const bestDressedFemaleSearch = document.getElementById('best-dressed-female-search');
    const bestDressedFemaleSuggestions = document.getElementById('best-dressed-female-suggestions');
    
    let maleNames = [];
    let femaleNames = [];
    let allNames = [];
    let currentUser = null;
    let isAdmin = false;
    
    // Domain-based voting data storage
    let votingRecords = [];
    let votingData = {
        'prom-king': {},
        'prom-queen': {},
        'best-dressed-male': {},
        'best-dressed-female': {}
    };
    
    // Voted users tracking
    let votedUsers = new Set();
    
    // Load search data directly embedded
    function loadSearchData() {
        // Clear existing data
        maleNames = [];
        femaleNames = [];
        allNames = [];
        
        // Load voting data from server
        loadVotingDataFromServer();
        
        // Male names
        const maleList = [
            'INESOLA, SEAN TIMOTHY QUIROY',
            'FLORES, JAMES LUIGI DAYDAYAN',
            'LEGASPINA, SIOUX CHEYENNE MONTEMAYOR',
            'CASTANARES, MATTHEW VELASCO',
            'JIMENEZ, JOHN LOYD MENDOZA',
            'ALLASGO, DON KEVIN JAMES CABALLES',
            'BELTRAN, CHRISTIAN JOSEPH LABISTE',
            'JABONILLO, JOHN REIL LLAMOS',
            'HISOLER, TAYSHAUN LEIF PINCA',
            'CABISAS, RONAN ANDRIE ALCARIA',
            'ROSTATA, CYRUS JOVER AMACNA',
            'FAMADOR, SHILOH SKYE ELARCOSA',
            'GABUTERO, JAMES BENEDICT ANGULO',
            'SALOMON, JOHANN ZACHERY ROMARATE',
            'MANUBAG, ANDREW MONTALLA',
            'SHARIEFF, HAFEEDH CANETE',
            'DIAZ, UZZIAH HENRICH NERVES',
            'RIVAMONTE, JOEY JAMES LAR SUEMITH',
            'JACABAN, KEIRHO CHRISTIAN VILLANUEVA',
            'KATIGBAK, JOHN ANDRIE PEREZ',
            'MALBACIAS, RAYMER AQUITAN',
            'DESQUITADO, JOHN VINCENT TAGHAP',
            'BORRES, KHEILLY AMANG',
            'RIZARRI, SION-CADAN NICHOLAS TROTT',
            'JUANTA, KIAN ANGELO VERACES',
            'SIDO, ARTROBIN SAGRADO',
            'BIRAD, LUIS ANDREI PANSOY',
            'COLINA, SANTINO CONDE',
            'ATILLO, JEROME JUNIOR ALINSUGAY',
            'CACHA, CHRISTAN SAVANT BASERGO',
            'ESCARRO, JUDE CAEL BAYON-ON',
            'PRADO, ISAIAH JOSH TOLERO',
            'CHU, HENKEL BORRES',
            'NAPOLIS, JOHN PAUL ABELLA',
            'LINGA, JED STEPHEN CASTANARES',
            'MINISTERIO, EDMARCHEAL JOHN SURVILLA',
            'NAPAL, ATHAN ANTHONY ALPUERTO',
            'TURA, ZOE TIMOTHY PONCARDAS',
            'ALINDAJAO, ANANIAS JOHN ZETA',
            'ESCOBER, BENEDICT BORLASA',
            'BELLEZA, EZEKIEL JOHN EAMIGUEL',
            'NEBRE, OLIVER RECONES',
            'DUBA, CHIED DORIMON',
            'LABAJO, CARLO THEODORE MONTESCLAROS',
            'VILLANUEVA, CHIESTER CUMBA',
            'GODINEZ, LLOYD LUIS TABAQUE',
            'MATA, JESREL ENGCOY',
            'CANETE, JOSH ALGREG REYES',
            'PAZA, DUSTIN GODFREY COGAL',
            'MUNASQUE, RAFFY RAIN EMIA',
            'ASONG, PAUL IVAN SAN JUAN'
        ];
        
        // Female names
        const femaleList = [
            'CABANESAS, RITCHELLENE TOLEDO',
            'SY, SEANTELE GABRIEL QUILONA',
            'IGOT, DANIELLE ALALIM',
            'GENON, KYZEL KAYE NAVIDAD',
            'TORREDES, LESLIE ANNE UBAS',
            'URGELLO, HAJEIDEL CURZ EMPASIS',
            'PASAYLO, HAYDEN NICHOLE CARBONERA',
            'LABRADOR, DANE ELAIZA GABISAY',
            'PIMENTEL, SAMIA RAYNA',
            'LIM, KRYSTAL RESTAURO',
            'VILLANUEVA, KAYE NATHALIE PADO',
            'TIMTIM, MARIEL KEE PIALA',
            'CERIOLA, ASHLEE NICOLE MALUYA',
            'FEROLINO, FARRAH EUNICE CANILLO',
            'DALIDA, ASHLEY NICOLE ABILONG',
            'BONGHANOY, JULIE ANN CASAS',
            'ABELLANOSA, KC ROSAL',
            'YNGENTE, LEANNE DENISE',
            'BANTAYAN, ANGEL LUTH DARELLE SITCHON',
            'IGOT, DAPPHNIE WANDA RUETE',
            'PANARES, JZECH HALLARY TAPIA',
            'MANDAWE, BRIANNA THERESE RAPSING',
            'QUIAMCO, CARLEEN MAVIN INFANTE',
            'CONCEPCION, EMBER',
            'CARBONILLA, ANGEL DAYMIEL',
            'AGUILAR, THERESE VIANNEY',
            'VILLANUEVA, JASMINE MALINAO',
            'BANADOS, HASHLYN GRACE ALBURO',
            'TIQUIL, SHABRINA TALITHA CAMBAL',
            'BILANGDAL, LYKA MAE ESCANDALLO',
            'CHIO, BEA CASSANDRA AUMAN',
            'BORCES, JELLIAN LOVI RAVELO',
            'DAYAG, MA. KATRINA JULIA ANCOT',
            'SILAO, JILNAH MAE FLORES',
            'TORREJAS, JESSA MAE LAGNAS',
            'LEGARA, MARYLOISE',
            'BERMISO, ELISHA MAE TAGHOY',
            'AMEROL, NORLAYKA SAROMANDANG',
            'SOMBILON, LOVE MARIE RUSAPA',
            'SAVIOR, REINA MIKIESHA APOSTOL',
            'INVENTO, IRISH JANE DEMORAL',
            'YOSORES, JHANINA FAYE AMOIN',
            'MALINAO, CAMILLE',
            'AUM, ERA CHRISTINE FLORIDA',
            'GERZON, CHARLOTTE GIANNE FUENTES',
            'OBAC, ALTEA JADE',
            'DELA CRUZ, CHARISSE ABBYGALE ARCHUA',
            'LORETO, CARMELLA VIEN GENEROSA',
            'BONANE, LORENCE MAE REGNER',
            'TAGACTAC, ZARA NICOLA MATULAC',
            'TESIORNA, JEHANNE SOPHIA ARELLANO',
            'PABALATE, SAMANTHA PALING',
            'MACANA, LOVELY JEAN YANA'
        ];
        
        // Add male names
        maleList.forEach(name => {
            maleNames.push({ name: name.trim() });
        });
        
        // Add female names
        femaleList.forEach(name => {
            femaleNames.push({ name: name.trim() });
        });
        
        // Combine all names for login
        allNames = [...maleNames, ...femaleNames];
        
        console.log('Male names loaded:', maleNames.length);
        console.log('Female names loaded:', femaleNames.length);
        console.log('Total names loaded:', allNames.length);
    }
    
    // Repository JSON file for cross-device synchronization
    async function saveVotingDataToServer() {
        try {
            const dataToSave = {
                votingRecords: votingRecords,
                votingData: votingData,
                votedUsers: Array.from(votedUsers),
                lastUpdated: new Date().toISOString()
            };
            
            // Save to localStorage as backup
            localStorage.setItem('promVotingData', JSON.stringify(dataToSave));
            
            // Create download link for manual sync
            const dataStr = JSON.stringify(dataToSave, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const dataUrl = URL.createObjectURL(dataBlob);
            
            // Create download link
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = 'voting-data.json';
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            
            console.log('Voting data saved successfully');
            console.log('Download link created for manual sync');
            
            // Auto-download for admin convenience
            if (isAdmin) {
                downloadLink.click();
                console.log('Auto-downloaded voting data for admin backup');
            }
            
        } catch (error) {
            console.error('Error saving voting data:', error);
        }
    }
    
    async function loadVotingDataFromServer() {
        try {
            // Try to load from repository JSON file first
            const response = await fetch('./voting-data.json');
            
            if (response.ok) {
                const savedData = await response.json();
                
                votingRecords = savedData.votingRecords || [];
                votingData = savedData.votingData || {
                    'prom-king': {},
                    'prom-queen': {},
                    'best-dressed-male': {},
                    'best-dressed-female': {}
                };
                votedUsers = new Set(savedData.votedUsers || []);
                
                // Save to localStorage as backup
                localStorage.setItem('promVotingData', JSON.stringify(savedData));
                
                console.log('Voting data loaded from repository JSON successfully');
            } else {
                // Fallback to localStorage
                const localData = localStorage.getItem('promVotingData');
                
                if (localData) {
                    const data = JSON.parse(localData);
                    
                    votingRecords = data.votingRecords || [];
                    votingData = data.votingData || {
                        'prom-king': {},
                        'prom-queen': {},
                        'best-dressed-male': {},
                        'best-dressed-female': {}
                    };
                    votedUsers = new Set(data.votedUsers || []);
                    
                    console.log('Voting data loaded from localStorage (repository sync failed)');
                } else {
                    // No data anywhere, use defaults
                    votingRecords = [];
                    votingData = {
                        'prom-king': {},
                        'prom-queen': {},
                        'best-dressed-male': {},
                        'best-dressed-female': {}
                    };
                    votedUsers = new Set();
                    console.log('No voting data found, starting fresh');
                }
            }
            
        } catch (error) {
            console.error('Error loading voting data:', error);
            // Fallback to defaults
            votingRecords = [];
            votingData = {
                'prom-king': {},
                'prom-queen': {},
                'best-dressed-male': {},
                'best-dressed-female': {}
            };
            votedUsers = new Set();
        }
    }
    
    function getGitHubToken() {
        // GitHub token for Gist API access
        const token = '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';
        
        // Validate token format
        if (!token || !token.startsWith('github_pat_')) {
            console.error('Invalid GitHub token format');
            return null;
        }
        
        return token;
    }
    
    // Fallback functions using localStorage
    function saveToFallback(data) {
        localStorage.setItem('promVotingData', JSON.stringify(data));
        console.log('Fallback to localStorage: data saved');
    }
    
    function loadFromFallback() {
        const savedData = localStorage.getItem('promVotingData');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                votingRecords = parsedData.votingRecords || [];
                votingData = parsedData.votingData || {
                    'prom-king': {},
                    'prom-queen': {},
                    'best-dressed-male': {},
                    'best-dressed-female': {}
                };
                votedUsers = new Set(parsedData.votedUsers || []);
                console.log('Fallback to localStorage: data loaded');
            } catch (error) {
                console.error('Error loading from localStorage fallback:', error);
                // Reset to default values
                votingRecords = [];
                votingData = {
                    'prom-king': {},
                    'prom-queen': {},
                    'best-dressed-male': {},
                    'best-dressed-female': {}
                };
                votedUsers = new Set();
            }
        } else {
            console.log('No saved data found, starting fresh');
        }
    }
    
    // Search functionality
    function filterSearch(query) {
        if (!query || query.length < 2) {
            return [];
        }
        
        const lowercaseQuery = query.toLowerCase();
        return allNames.filter(item => {
            return item.name.toLowerCase().includes(lowercaseQuery);
        }).slice(0, 8); // Limit to 8 suggestions
    }
    
    function showNameSuggestions(suggestions) {
        nameSuggestionsDropdown.innerHTML = '';
        
        if (suggestions.length === 0) {
            nameSuggestionsDropdown.style.display = 'none';
            return;
        }
        
        suggestions.forEach(item => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.className = 'suggestion-item';
            suggestionDiv.innerHTML = `
                <div class="suggestion-name">${item.name}</div>
            `;
            
            suggestionDiv.addEventListener('click', () => {
                nameInput.value = item.name;
                nameSuggestionsDropdown.style.display = 'none';
            });
            
            nameSuggestionsDropdown.appendChild(suggestionDiv);
        });
        
        nameSuggestionsDropdown.style.display = 'block';
    }
    
    function handleSearchSelection(item) {
        console.log('Selected item:', item);
        // You can add more functionality here, like showing details
        showNotification(`Selected: ${item.name}`);
    }
    
    function showVotingInterface() {
        loginInterface.style.display = 'none';
        votingContent.style.display = 'block';
        
        // Populate voting candidates (using gender-specific names)
        populateVotingCandidates();
        
        // Setup search functionality for each voting category
        setupVotingSearch(promKingSearch, promKingSuggestions, maleNames);
        setupVotingSearch(promQueenSearch, promQueenSuggestions, femaleNames);
        setupVotingSearch(bestDressedMaleSearch, bestDressedMaleSuggestions, maleNames);
        setupVotingSearch(bestDressedFemaleSearch, bestDressedFemaleSuggestions, femaleNames);
        
        // Setup voting checkbox functionality
        setupVotingCheckboxes();
        
        showNotification(`Welcome, ${currentUser}! You can now vote for prom roles.`);
    }
    
    function populateVotingCandidates() {
        // Clear existing candidates
        promKingCandidates.innerHTML = '';
        promQueenCandidates.innerHTML = '';
        bestDressedMaleCandidates.innerHTML = '';
        bestDressedFemaleCandidates.innerHTML = '';
        
        // Add male names for Prom King
        maleNames.forEach((candidate, index) => {
            const kingCandidate = createVotingCandidate(candidate.name, 'prom-king');
            promKingCandidates.appendChild(kingCandidate);
        });
        
        // Add female names for Prom Queen
        femaleNames.forEach((candidate, index) => {
            const queenCandidate = createVotingCandidate(candidate.name, 'prom-queen');
            promQueenCandidates.appendChild(queenCandidate);
        });
        
        // Add male names for Best Dressed Male
        maleNames.forEach((candidate, index) => {
            const maleCandidate = createVotingCandidate(candidate.name, 'best-dressed-male');
            bestDressedMaleCandidates.appendChild(maleCandidate);
        });
        
        // Add female names for Best Dressed Female
        femaleNames.forEach((candidate, index) => {
            const femaleCandidate = createVotingCandidate(candidate.name, 'best-dressed-female');
            bestDressedFemaleCandidates.appendChild(femaleCandidate);
        });
    }
    
    function createVotingCandidate(name, categoryName) {
        const candidateDiv = document.createElement('div');
        candidateDiv.className = 'voting-candidate';
        const cleanName = name.replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        const uniqueId = `${cleanName}-${categoryName}`;
        candidateDiv.innerHTML = `
            <input type="checkbox" name="vote-${categoryName}" id="${uniqueId}" value="${name}" class="voting-checkbox">
            <label for="${uniqueId}">${name}</label>
        `;
        return candidateDiv;
    }
    
    function setupVotingCheckboxes() {
        const checkboxes = document.querySelectorAll('.voting-checkbox');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function(e) {
                const categoryName = this.name; // e.g., "vote-prom-king", "vote-prom-queen", etc.
                const categoryCheckboxes = document.querySelectorAll(`input[name="${categoryName}"]`);
                
                if (this.checked) {
                    // Uncheck all other checkboxes in the same category
                    categoryCheckboxes.forEach(otherCheckbox => {
                        if (otherCheckbox !== this) {
                            otherCheckbox.checked = false;
                        }
                    });
                    
                    // Store vote in voting data
                    if (!votingData[categoryName]) {
                        votingData[categoryName] = {};
                    }
                    votingData[categoryName][this.value] = (votingData[categoryName][this.value] || 0) + 1;
                }
            });
        });
    }
    
    function loadVotingResults() {
        // Clear existing results
        promKingResults.innerHTML = '';
        promQueenResults.innerHTML = '';
        bestDressedMaleResults.innerHTML = '';
        bestDressedFemaleResults.innerHTML = '';
        
        // Count votes and display results
        displayVotingResults('prom-king', promKingResults);
        displayVotingResults('prom-queen', promQueenResults);
        displayVotingResults('best-dressed-male', bestDressedMaleResults);
        displayVotingResults('best-dressed-female', bestDressedFemaleResults);
        
        // Display voting records
        displayVotingRecords();
    }
    
    function displayVotingRecords() {
        // Create a records section if it doesn't exist
        let recordsSection = document.getElementById('voting-records');
        if (!recordsSection) {
            recordsSection = document.createElement('div');
            recordsSection.id = 'voting-records';
            recordsSection.className = 'records-section';
            
            const recordsTitle = document.createElement('h3');
            recordsTitle.textContent = 'Complete Voting Records';
            recordsTitle.style.color = '#ffd700';
            recordsTitle.style.marginBottom = '1rem';
            
            const recordsList = document.createElement('div');
            recordsList.id = 'records-list';
            recordsList.className = 'records-list';
            
            recordsSection.appendChild(recordsTitle);
            recordsSection.appendChild(recordsList);
            
            // Insert after admin results
            const adminResults = document.querySelector('.admin-results');
            adminResults.parentNode.insertBefore(recordsSection, adminResults.nextSibling);
        }
        
        const recordsList = document.getElementById('records-list');
        recordsList.innerHTML = '';
        
        if (votingRecords.length === 0) {
            recordsList.innerHTML = '<div class="no-records">No voting records yet</div>';
            return;
        }
        
        // Display all voting records
        votingRecords.forEach((record, index) => {
            const recordItem = document.createElement('div');
            recordItem.className = 'record-item';
            
            const timestamp = new Date(record.timestamp).toLocaleString();
            const votesText = Object.entries(record.votes)
                .filter(([_, name]) => name !== null)
                .map(([category, name]) => `${category}: ${name}`)
                .join(', ');
            
            recordItem.innerHTML = `
                <div class="record-header">
                    <span class="record-user">${record.user}</span>
                    <span class="record-time">${timestamp}</span>
                </div>
                <div class="record-votes">${votesText || 'No votes'}</div>
            `;
            
            recordsList.appendChild(recordItem);
        });
    }
    
    function displayVotingResults(category, resultsContainer) {
        const categoryVotes = votingData[category] || {};
        const sortedVotes = Object.entries(categoryVotes)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10); // Show top 10
        
        if (sortedVotes.length === 0) {
            resultsContainer.innerHTML = '<div class="no-votes">No votes yet</div>';
            return;
        }
        
        sortedVotes.forEach(([name, votes]) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <div class="result-name">${name}</div>
                <div class="result-votes">${votes} vote${votes === 1 ? '' : 's'}</div>
            `;
            resultsContainer.appendChild(resultItem);
        });
    }
    
    async function submitVotes() {
        // Get all selected votes
        const selectedVotes = {
            'prom-king': null,
            'prom-queen': null,
            'best-dressed-male': null,
            'best-dressed-female': null
        };
        
        // Find selected checkbox in each category
        Object.keys(selectedVotes).forEach(category => {
            const selectedCheckbox = document.querySelector(`input[name="vote-${category}"]:checked`);
            if (selectedCheckbox) {
                selectedVotes[category] = selectedCheckbox.value;
            }
        });
        
        // Validate that user has selected at least one vote
        const hasVotes = Object.values(selectedVotes).some(vote => vote !== null);
        
        if (hasVotes) {
            // Add current user to voted users set
            votedUsers.add(currentUser);
            
            // Create voting record for domain-based storage
            const votingRecord = {
                timestamp: new Date().toISOString(),
                user: currentUser,
                votes: selectedVotes
            };
            
            // Add to voting records list
            votingRecords.push(votingRecord);
            
            // Update local voting data for display
            Object.entries(selectedVotes).forEach(([category, name]) => {
                if (name) {
                    if (!votingData[category]) {
                        votingData[category] = {};
                    }
                    votingData[category][name] = (votingData[category][name] || 0) + 1;
                }
            });
            
            showNotification('Votes submitted successfully!', 'success');
            
            // Save voting data to server
            await saveVotingDataToServer();
            
            // Clear selections after submission
            document.querySelectorAll('.voting-checkbox:checked').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Log out user after voting
            setTimeout(() => {
                voterLogout();
            }, 2000);
        } else {
            showNotification('Please select at least one candidate to vote for!', 'error');
        }
    }
    
    function voterLogout() {
        currentUser = null;
        votingContent.style.display = 'none';
        loginInterface.style.display = 'block';
        
        // Force login interface to center
        centerLoginInterface();
        
        // Clear selections
        document.querySelectorAll('.voting-checkbox:checked').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset to user login form
        userLoginForm.style.display = 'block';
        adminLoginForm.style.display = 'none';
        userLoginBtn.classList.add('active');
        adminLoginBtn.classList.remove('active');
        
        showNotification('Logged out successfully!');
    }
    
    function centerLoginInterface() {
        // Force login interface to recenter itself
        loginInterface.style.display = 'flex';
        loginInterface.style.alignItems = 'center';
        loginInterface.style.justifyContent = 'center';
        loginInterface.style.position = 'fixed';
        loginInterface.style.top = '0';
        loginInterface.style.left = '0';
        loginInterface.style.width = '100%';
        loginInterface.style.height = '100%';
        
        // Trigger a reflow to ensure the styles are applied
        loginInterface.offsetHeight;
    }
    
    async function resetAllVotes() {
        // Show confirmation dialog
        const confirmReset = confirm('Are you sure you want to reset all voting results? This will clear all votes and allow all users to vote again.');
        
        if (confirmReset) {
            try {
                // Clear server data
                await clearServerData();
                
                // Clear all voting data
                votingData = {
                    'prom-king': {},
                    'prom-queen': {},
                    'best-dressed-male': {},
                    'best-dressed-female': {}
                };
                
                // Clear voted users set to allow re-voting
                votedUsers.clear();
                
                // Clear voting records list
                votingRecords = [];
                
                // Clear localStorage fallback
                localStorage.removeItem('promVotingData');
                
                // Refresh admin results display
                loadVotingResults();
                
                showNotification('All voting results and records have been reset successfully!', 'success');
            } catch (error) {
                console.error('Error resetting server data:', error);
                showNotification('Error resetting server data. Please try again.', 'error');
            }
        }
    }
    
    async function clearServerData() {
        try {
            // Clear repository JSON file
            const emptyData = {
                votingRecords: [],
                votingData: {
                    'prom-king': {},
                    'prom-queen': {},
                    'best-dressed-male': {},
                    'best-dressed-female': {}
                },
                votedUsers: [],
                lastUpdated: new Date().toISOString()
            };
            
            // Create download link for empty data
            const dataStr = JSON.stringify(emptyData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const dataUrl = URL.createObjectURL(dataBlob);
            
            // Create download link
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = 'voting-data.json';
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            
            console.log('Repository data cleared successfully');
            console.log('Download link created for empty voting data');
            
            // Auto-download for admin convenience
            if (isAdmin) {
                downloadLink.click();
                console.log('Auto-downloaded empty voting data for admin');
            }
            
            // Clear localStorage
            localStorage.removeItem('promVotingData');
            localStorage.removeItem('promVotingExport');
            
            // Reset voting data to defaults
            votingRecords = [];
            votingData = {
                'prom-king': {},
                'prom-queen': {},
                'best-dressed-male': {},
                'best-dressed-female': {}
            };
            votedUsers = new Set();
            
        } catch (error) {
            console.error('Error clearing repository data:', error);
            throw error;
        }
    }
    
    // Name input event listeners
    nameInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const suggestions = filterSearch(query);
        showNameSuggestions(suggestions);
    });
    
    nameInput.addEventListener('focus', () => {
        if (nameInput.value.length >= 2) {
            const suggestions = filterSearch(nameInput.value);
            showNameSuggestions(suggestions);
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.name-selection-container') && !e.target.closest('.voting-search-container')) {
            nameSuggestionsDropdown.style.display = 'none';
            document.querySelectorAll('.voting-suggestions-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
    
    // Load data when page loads
    loadSearchData();
    
    // Set initial state
    curtainOverlay.classList.add('active');
    
    // Voting action buttons functionality
    submitVotesBtn.addEventListener('click', () => {
        submitVotes();
    });
    
    voterLogoutBtn.addEventListener('click', () => {
        voterLogout();
    });
    
    // Reset button functionality
    resetVotesBtn.addEventListener('click', () => {
        resetAllVotes();
    });
    
    // Login toggle functionality
    userLoginBtn.addEventListener('click', () => {
        userLoginBtn.classList.add('active');
        adminLoginBtn.classList.remove('active');
        userLoginForm.style.display = 'block';
        adminLoginForm.style.display = 'none';
    });
    
    adminLoginBtn.addEventListener('click', () => {
        adminLoginBtn.classList.add('active');
        userLoginBtn.classList.remove('active');
        userLoginForm.style.display = 'none';
        adminLoginForm.style.display = 'block';
    });
    
    // Name input event listeners
    nameInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const suggestions = filterSearch(query);
        showNameSuggestions(suggestions);
    });
    
    nameInput.addEventListener('focus', () => {
        if (nameInput.value.length >= 2) {
            const suggestions = filterSearch(nameInput.value);
            showNameSuggestions(suggestions);
        }
    });
    
    selectNameBtn.addEventListener('click', () => {
        const selectedName = nameInput.value.trim();
        if (selectedName) {
            // Check if user has already voted
            if (votedUsers.has(selectedName)) {
                showNotification('This account has already voted and cannot vote again!', 'error');
                return;
            }
            
            currentUser = selectedName;
            showVotingInterface();
        }
    });
    
    // Admin login functionality
    adminLoginSubmit.addEventListener('click', () => {
        const password = adminPassword.value.trim();
        if (password === 'boogeraids') {
            isAdmin = true;
            currentUser = 'Admin';
            loginInterface.style.display = 'none';
            votingContent.style.display = 'none';
            adminContent.style.display = 'block';
            loadVotingResults();
            showNotification('Admin access granted!');
        } else {
            showNotification('Invalid password!', 'error');
        }
    });
    
    // Admin logout functionality
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            isAdmin = false;
            currentUser = null;
            adminContent.style.display = 'none';
            votingContent.style.display = 'none';
            loginInterface.style.display = 'block';
            adminPassword.value = '';
            
            // Force login interface to center
            centerLoginInterface();
            
            // Reset login forms to centered state
            userLoginForm.style.display = 'block';
            adminLoginForm.style.display = 'none';
            userLoginBtn.classList.add('active');
            adminLoginBtn.classList.remove('active');
            
            showNotification('Logged out successfully!');
        });
    }
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.name-selection-container')) {
            nameSuggestionsDropdown.style.display = 'none';
        }
        if (!e.target.closest('.voting-search-container')) {
            document.querySelectorAll('.voting-suggestions-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
    
    // Voting search functionality
    function setupVotingSearch(searchInput, suggestionsDropdown, nameList) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            const suggestions = filterVotingCandidates(query, nameList);
            showVotingSuggestions(suggestions, suggestionsDropdown, searchInput);
        });
        
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.length >= 2) {
                const suggestions = filterVotingCandidates(searchInput.value, nameList);
                showVotingSuggestions(suggestions, suggestionsDropdown, searchInput);
            }
        });
    }
    
    function filterVotingCandidates(query, nameList) {
        if (!query || query.length < 2) {
            return [];
        }
        
        const lowercaseQuery = query.toLowerCase();
        return nameList.filter(item => {
            return item.name.toLowerCase().includes(lowercaseQuery);
        }).slice(0, 8); // Limit to 8 suggestions
    }
    
    function showVotingSuggestions(suggestions, dropdown, searchInput) {
        dropdown.innerHTML = '';
        
        if (suggestions.length === 0) {
            dropdown.style.display = 'none';
            return;
        }
        
        suggestions.forEach(item => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.className = 'suggestion-item';
            suggestionDiv.innerHTML = `
                <div class="suggestion-name">${item.name}</div>
            `;
            
            suggestionDiv.addEventListener('click', () => {
                searchInput.value = item.name;
                dropdown.style.display = 'none';
                
                // Find all checkboxes with this value (there might be duplicates across categories)
                const checkboxes = document.querySelectorAll(`input[value="${item.name}"]`);
                
                if (checkboxes.length > 0) {
                    // Find the checkbox that's in the same category as the search input
                    let targetCheckbox = null;
                    let targetCandidateDiv = null;
                    
                    checkboxes.forEach(checkbox => {
                        const candidateDiv = checkbox.closest('.voting-candidate');
                        const votingCategory = checkbox.closest('.voting-category');
                        const searchContainer = searchInput.closest('.voting-search-container');
                        
                        // Check if this checkbox is in the same category as the search input
                        if (votingCategory && searchContainer && votingCategory.contains(searchContainer)) {
                            targetCheckbox = checkbox;
                            targetCandidateDiv = candidateDiv;
                        }
                    });
                    
                    // If no specific match found, use the first one and scroll to it
                    if (!targetCheckbox && checkboxes.length > 0) {
                        targetCheckbox = checkboxes[0];
                        targetCandidateDiv = targetCheckbox.closest('.voting-candidate');
                    }
                    
                    if (targetCheckbox) {
                        // Toggle the checkbox
                        if (targetCheckbox.checked) {
                            targetCheckbox.checked = false;
                        } else {
                            targetCheckbox.checked = true;
                            // Trigger change event to handle one-vote-per-category logic
                            targetCheckbox.dispatchEvent(new Event('change'));
                        }
                        
                        // Scroll to the candidate
                        if (targetCandidateDiv) {
                            targetCandidateDiv.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                            
                            // Add highlight effect
                            targetCandidateDiv.style.background = 'rgba(255, 215, 0, 0.3)';
                            targetCandidateDiv.style.border = '2px solid #ffd700';
                            setTimeout(() => {
                                targetCandidateDiv.style.background = '';
                                targetCandidateDiv.style.border = '';
                            }, 1500);
                        }
                    }
                }
            });
            
            dropdown.appendChild(suggestionDiv);
        });
        
        dropdown.style.display = 'block';
    }
    
    // Curtain opening function
    function openCurtain() {
        // Add open class to curtain overlay
        curtainOverlay.classList.add('open');
        
        // Reveal main content with a slight delay for dramatic effect
        setTimeout(() => {
            mainContent.classList.add('revealed');
        }, 500);
        
        // Remove active class to disable pointer events on curtain
        setTimeout(() => {
            curtainOverlay.classList.remove('active');
        }, 2000);
        
        // Play background music
        playBackgroundMusic();
        
        // Play a subtle sound effect if we had one
        playCurtainSound();
    }
    
    // Background music function
    function playBackgroundMusic() {
        // Set volume to a reasonable level
        backgroundMusic.volume = 0.3;
        
        // Play the music
        backgroundMusic.play().catch(error => {
            console.log('Background music autoplay was prevented:', error);
            // Add a click listener to enable music after user interaction
            document.addEventListener('click', function enableMusic() {
                backgroundMusic.play().catch(e => console.log('Music play failed:', e));
                document.removeEventListener('click', enableMusic);
            }, { once: true });
        });
    }
    
    // Sound effect function (placeholder for now)
    function playCurtainSound() {
        // In a real implementation, you could add an audio file here
        // For now, we'll just use a visual feedback
        console.log('🎭 Curtain opening with dramatic flair!');
    }
    
    // Add click event to curtain pull handle
    curtainPull.addEventListener('click', openCurtain);
    
    // Also allow clicking anywhere on the curtain to open it
    curtainOverlay.addEventListener('click', function(e) {
        // Only open if clicking on the curtain itself, not the pull handle
        if (e.target === curtainOverlay || e.target.classList.contains('curtain-left') || e.target.classList.contains('curtain-right')) {
            openCurtain();
        }
    });
    
    // Add keyboard support (press Enter or Space to open)
    document.addEventListener('keydown', function(e) {
        if (curtainOverlay.classList.contains('active') && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            openCurtain();
        }
    });
    
    // Add some interactive elements to the main content
    const ctaButton = document.querySelector('.cta-button');
    const eventCards = document.querySelectorAll('.event-card');
    
    // CTA Button interaction (only if exists)
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            showNotification('Thank you for your interest! Our concierge will contact you soon.');
        });
    }
    
    // Event card interactions (only if they exist)
    if (eventCards.length > 0) {
        eventCards.forEach(card => {
            card.addEventListener('click', function() {
                const eventName = this.querySelector('h3')?.textContent || 'Event';
                const eventDate = this.querySelector('.event-date')?.textContent || 'Date TBD';
                showNotification(`${eventName} - ${eventDate}. Click to learn more!`);
            });
        });
    }
    
    // Notification function
    function showNotification(message) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
            color: #ffd700;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            border: 2px solid #ffd700;
            box-shadow: 0 4px 20px rgba(139, 0, 0, 0.7);
            z-index: 2000;
            font-weight: bold;
            animation: slideIn 0.5s ease;
            max-width: 300px;
        `;
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
    
    // Add some ambient animations
    function addAmbientEffects() {
        // Create floating particles for extra ambiance
        setInterval(() => {
            if (Math.random() > 0.7) {
                createParticle();
            }
        }, 2000);
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: 100%;
            box-shadow: 0 0 10px #ffd700;
            animation: floatUp 4s linear;
        `;
        
        // Add float animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                from {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }
    
    // Start ambient effects after curtain opens
    setTimeout(() => {
        if (mainContent.classList.contains('revealed')) {
            addAmbientEffects();
        }
    }, 3000);
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        if (mainContent.classList.contains('revealed')) {
            const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
            
            const spotlight = document.querySelector('.spotlight');
            if (spotlight) {
                spotlight.style.transform = `translateX(-50%) rotate(${x * 10}deg)`;
            }
        }
    });
});
