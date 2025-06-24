document.addEventListener('DOMContentLoaded', function() {
    const commands = [
        { name: "/inventory", description: "View your purchased items", category: "user", example: "/inventory", tip: "Check here after buying items from the shop" },
        { name: "/purchase_history", description: "View purchase history for the server or a specific user (Admin only)", category: "admin", example: "/purchase_history @username", tip: "Great for tracking shop activity" },
        { name: "/manage_stock_help", description: "Get detailed help for managing shop item stock", category: "admin", example: "/manage_stock_help", tip: "A comprehensive guide to stock management" },
        { name: "/add_content_item", description: "Add a shop item with custom content reward", category: "admin", example: "/add_content_item \"VIP Role\" 1000 \"Gives VIP role for 30 days\"", tip: "Perfect for special rewards" },
        { name: "/add_multi_content", description: "Add multiple content items to the shop (like codes or keys)", category: "admin", example: "/add_multi_content \"Game Keys\" 500 key1,key2,key3", tip: "Useful for digital item distribution" },
        { name: "/manage_shop_stock", description: "Manage stock for shop items (Admin only)", category: "admin", example: "/manage_shop_stock \"VIP Role\" 10", tip: "Keep your shop inventory updated" },
        { name: "/my_quests", description: "View your in-progress quests", category: "quests", example: "/my_quests", tip: "Track your active quest progress" },
        { name: "/test_shop_items", description: "Test retrieving shop items", category: "admin", example: "/test_shop_items", tip: "Verify shop functionality" },
        { name: "/debug_shop", description: "Debug the shop system", category: "admin", example: "/debug_shop", tip: "Troubleshoot shop issues" },
        { name: "/set_quest_requirement", description: "Set the number of quests required before accepting bounties", category: "admin", example: "/set_quest_requirement 5", tip: "Balance progression for new users" },
        { name: "/backup_database", description: "Create a backup of the database", category: "admin", example: "/backup_database", tip: "Regular backups prevent data loss" },
        { name: "/restore_database", description: "Restore the database from a backup", category: "admin", example: "/restore_database backup_20230615", tip: "Use with caution - this overwrites current data" },
        { name: "/update_shop_structure", description: "Update the shop database structure to support special items", category: "admin", example: "/update_shop_structure", tip: "Run after bot updates" },
        { name: "/submit_quest", description: "Submit proof of completion for a quest", category: "quests", example: "/submit_quest 123 [screenshot attachment]", tip: "Include clear evidence of completion" },
        { name: "/profile", description: "View your profile with XP, level, and balance", category: "user", example: "/profile", tip: "Check your progress and currency" },
        { name: "/quests", description: "View available quests", category: "quests", example: "/quests", tip: "Find new challenges to complete" },
        { name: "/bounties", description: "View available bounties", category: "quests", example: "/bounties", tip: "Higher rewards for more challenging tasks" },
        { name: "/my_bounties", description: "View bounties you've created or are assigned to", category: "quests", example: "/my_bounties", tip: "Track your bounty progress" },
        { name: "/leaderboard", description: "View server leaderboards", category: "user", example: "/leaderboard", tip: "See who's on top" },
        { name: "/create_bounty", description: "Create a new bounty (Bounty Makers only)", category: "quests", example: "/create_bounty \"Website Design\" 5000 \"Create a landing page\"", tip: "Set fair rewards for the work required" },
        { name: "/create_quest", description: "Create a new quest (Admin only)", category: "admin", example: "/create_quest \"Welcome Quest\" 100 \"Introduce yourself\"", tip: "Good quests are clear and achievable" },
        { name: "/set_bounty_maker", description: "Give or remove bounty maker status (Admin only)", category: "admin", example: "/set_bounty_maker @username true", tip: "Choose trusted members for this role" },
        { name: "/set_level_role", description: "Set a role reward for reaching a level (Admin only)", category: "admin", example: "/set_level_role 10 @VeteranRole", tip: "Great for progression rewards" },
        { name: "/set_prefix", description: "Change the bot prefix", category: "admin", example: "/set_prefix !", tip: "Choose a unique prefix to avoid conflicts" },
        { name: "/give_money", description: "Give money to a user (Admin only)", category: "admin", example: "/give_money @username 1000", tip: "Use for event rewards or compensation" },
        { name: "/give_xp", description: "Give XP to a user (Admin only)", category: "admin", example: "/give_xp @username 500", tip: "Reward participation outside the quest system" },
        { name: "/setup_shop_entry", description: "Post the shop entry point in a specific channel (admin only)", category: "admin", example: "/setup_shop_entry #shop-channel", tip: "Creates an interactive shop access point" },
        { name: "/shop", description: "View the server shop", category: "shop", example: "/shop", tip: "Browse available items to purchase" },
        { name: "/add_shop_item", description: "Add a new item to the server shop (Admin only)", category: "admin", example: "/add_shop_item \"VIP Role\" 1000 @VIPRole", tip: "Set reasonable prices for balance" },
        { name: "/buy", description: "Buy an item from the shop", category: "shop", example: "/buy \"VIP Role\"", tip: "Make sure you have enough currency" },
        { name: "/daily", description: "Claim your daily €", category: "user", example: "/daily", tip: "Don't forget to claim every day" },
        { name: "/set_daily_amount", description: "Set the daily reward amount (Admin only)", category: "admin", example: "/set_daily_amount 100", tip: "Balance this with your economy" },
        { name: "/transfer", description: "Transfer € to another user", category: "user", example: "/transfer @username 500", tip: "Great for player trading" },
        { name: "/setup_leaderboard", description: "Set up an auto-updating leaderboard", category: "admin", example: "/setup_leaderboard #leaderboard-channel", tip: "Encourages friendly competition" },
        { name: "/setup_bounty_announcements", description: "Set up automatic bounty announcements (Admin only)", category: "admin", example: "/setup_bounty_announcements #bounty-channel", tip: "Keeps members informed of opportunities" },
        { name: "/reset_user", description: "Reset a user's data", category: "admin", example: "/reset_user @username", tip: "Use with extreme caution" },
        { name: "/setup_bot", description: "Quick setup wizard for the bot (Admin only)", category: "admin", example: "/setup_bot", tip: "Great for first-time configuration" },
        { name: "/help", description: "View bot commands and information", category: "user", example: "/help", tip: "The starting point for new users" }
    ];

    const commandsList = document.getElementById('commands-list');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const categoryTabs = document.querySelectorAll('.category-tabs li');
    const themeSwitch = document.getElementById('theme-switch');
    const mascot = document.getElementById('mascot');

    let activeCategory = 'all';
    let searchQuery = '';
    let mascotPosition = { x: 0, y: 0 };
    let mascotTarget = { x: 0, y: 0 };
    let mascotVelocity = { x: 0, y: 0 };
    let mascotFrame = 0;
    let mascotDirection = 'right';

    renderCommands();

    searchBar.addEventListener('input', function() {
        searchQuery = this.value.toLowerCase();
        renderCommands();
    });

    searchButton.addEventListener('click', function() {
        searchQuery = searchBar.value.toLowerCase();
        renderCommands();
    });

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            activeCategory = this.getAttribute('data-category');
            renderCommands();
        });
    });

    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    });

    document.addEventListener('mousemove', function(e) {
        mascotTarget.x = e.clientX - 32;
        mascotTarget.y = e.clientY - 32;
    });

    function updateMascot() {
        const dx = mascotTarget.x - mascotPosition.x;
        const dy = mascotTarget.y - mascotPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
            mascotVelocity.x = dx * 0.1;
            mascotVelocity.y = dy * 0.1;
            
            mascotPosition.x += mascotVelocity.x;
            mascotPosition.y += mascotVelocity.y;
            
            if (dx > 0) {
                mascotDirection = 'right';
            } else if (dx < 0) {
                mascotDirection = 'left';
            }
            
            mascotFrame = (mascotFrame + 1) % 4;
        } else {
            mascotFrame = (mascotFrame + 0.1) % 4;
        }
        
        mascot.style.left = `${mascotPosition.x}px`;
        mascot.style.top = `${mascotPosition.y}px`;
        mascot.style.transform = mascotDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)';
        
        requestAnimationFrame(updateMascot);
    }
    
    mascotPosition.x = window.innerWidth / 2;
    mascotPosition.y = window.innerHeight / 2;
    updateMascot();

    document.addEventListener('mousemove', function(e) {
        const layers = document.querySelectorAll('.parallax-layer');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        layers.forEach((layer, index) => {
            const depth = (index + 1) * 10;
            const moveX = (mouseX * depth) - (depth / 2);
            const moveY = (mouseY * depth) - (depth / 2);
            layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${(5-index)/2})`;
        });
    });

    function renderCommands() {
        commandsList.innerHTML = '';
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        for (let i = 0; i < 3; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'loading-pixel';
            loadingDiv.appendChild(pixel);
        }
        commandsList.appendChild(loadingDiv);
        
        setTimeout(() => {
            commandsList.innerHTML = '';
            
            let filteredCommands = commands;
            
            if (activeCategory !== 'all') {
                filteredCommands = filteredCommands.filter(cmd => cmd.category === activeCategory);
            }
            
            if (searchQuery) {
                filteredCommands = filteredCommands.filter(cmd => 
                    cmd.name.toLowerCase().includes(searchQuery) || 
                    cmd.description.toLowerCase().includes(searchQuery)
                );
            }
            
            if (filteredCommands.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = 'No commands found matching your criteria';
                commandsList.appendChild(noResults);
            } else {
                filteredCommands.forEach(cmd => {
                    const card = document.createElement('div');
                    card.className = 'command-card';
                    
                    const cardInner = document.createElement('div');
                    cardInner.className = 'command-card-inner';
                    
                    // Front of card
                    const cardFront = document.createElement('div');
                    cardFront.className = 'command-card-front';
                    
                    const name = document.createElement('h3');
                    name.className = 'command-name';
                    name.textContent = cmd.name;
                    
                    const description = document.createElement('p');
                    description.className = 'command-description';
                    description.textContent = cmd.description;
                    
                    const category = document.createElement('span');
                    category.className = 'command-category';
                    category.textContent = cmd.category.toUpperCase();
                    
                    cardFront.appendChild(name);
                    cardFront.appendChild(description);
                    cardFront.appendChild(category);
                    
                    const cardBack = document.createElement('div');
                    cardBack.className = 'command-card-back';
                    
                    const backName = document.createElement('h3');
                    backName.className = 'command-name';
                    backName.textContent = cmd.name;
                    
                    const details = document.createElement('div');
                    details.className = 'command-details';
                    
                    const exampleTitle = document.createElement('h4');
                    exampleTitle.textContent = 'EXAMPLE:';
                    
                    const example = document.createElement('div');
                    example.className = 'command-example';
                    example.textContent = cmd.example;
                    
                    const tip = document.createElement('p');
                    tip.className = 'command-tip';
                    tip.textContent = `TIP: ${cmd.tip}`;
                    
                    details.appendChild(exampleTitle);
                    details.appendChild(example);
                    details.appendChild(tip);
                    
                    cardBack.appendChild(backName);
                    cardBack.appendChild(details);
                    
                    // Assemble card
                    cardInner.appendChild(cardFront);
                    cardInner.appendChild(cardBack);
                    card.appendChild(cardInner);
                    
                    commandsList.appendChild(card);
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                });
            }
        }, 800); 
    }

    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        document.body.classList.add('easter-egg');
        
        const easterEggDiv = document.createElement('div');
        easterEggDiv.className = 'easter-egg-message';
        easterEggDiv.innerHTML = '<h2>SECRET UNLOCKED!</h2><p>You found the hidden treasure chest!</p>';
        document.body.appendChild(easterEggDiv);
        
        setTimeout(() => {
            easterEggDiv.remove();
            document.body.classList.remove('easter-egg');
        }, 5000);
    }

    function checkMobile() {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }
    
    window.addEventListener('resize', checkMobile);
    checkMobile();

    function initMascot() {
        const edge = Math.floor(Math.random() * 4); 
        
        switch(edge) {
            case 0: 
                mascotPosition.x = Math.random() * window.innerWidth;
                mascotPosition.y = -64;
                break;
            case 1: 
                mascotPosition.x = window.innerWidth + 64;
                mascotPosition.y = Math.random() * window.innerHeight;
                break;
            case 2: 
                mascotPosition.x = Math.random() * window.innerWidth;
                mascotPosition.y = window.innerHeight + 64;
                break;
            case 3: 
                mascotPosition.x = -64;
                mascotPosition.y = Math.random() * window.innerHeight;
                break;
        }
        
        mascotTarget.x = window.innerWidth / 2;
        mascotTarget.y = window.innerHeight / 2;
        
        mascot.style.left = `${mascotPosition.x}px`;
        mascot.style.top = `${mascotPosition.y}px`;
    }
    
    initMascot();
    
    setInterval(() => {
        if (Math.random() < 0.2) {
            mascotTarget.x = Math.random() * window.innerWidth;
            mascotTarget.y = Math.random() * window.innerHeight;
        }
    }, 5000);
    
    mascot.addEventListener('click', () => {
        mascot.style.animation = 'none';
        void mascot.offsetWidth; 
        mascot.style.animation = 'mascot-jump 0.5s';
        
        const tips = [
            "Try using the search bar to find specific commands!",
            "Click on category tabs to filter commands!",
            "Hover over command cards to see more details!",
            "Use /help in Discord to see all commands!",
            "The day/night toggle is in the top right corner!",
            "There might be hidden easter eggs... keep exploring!"
        ];
        
        const tipIndex = Math.floor(Math.random() * tips.length);
        
        const tipBubble = document.createElement('div');
        tipBubble.className = 'mascot-tip';
        tipBubble.textContent = tips[tipIndex];
        tipBubble.style.position = 'absolute';
        tipBubble.style.left = `${mascotPosition.x + 70}px`;
        tipBubble.style.top = `${mascotPosition.y - 20}px`;
        tipBubble.style.backgroundColor = 'var(--dark)';
        tipBubble.style.color = 'var(--light)';
        tipBubble.style.padding = '10px';
        tipBubble.style.borderRadius = '5px';
        tipBubble.style.maxWidth = '200px';
        tipBubble.style.fontSize = '0.7rem';
        tipBubble.style.zIndex = '1000';
        tipBubble.style.boxShadow = '0 0 10px var(--accent)';
        tipBubble.style.border = '2px solid var(--primary)';
        
        document.body.appendChild(tipBubble);
        
        setTimeout(() => {
            tipBubble.style.opacity = '0';
            setTimeout(() => {
                tipBubble.remove();
            }, 500);
        }, 3000);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes mascot-jump {
            0% { transform: translateY(0) ${mascotDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}; }
            50% { transform: translateY(-30px) ${mascotDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}; }
            100% { transform: translateY(0) ${mascotDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}; }
        }
    `;
    document.head.appendChild(style);
});