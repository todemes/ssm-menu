document.addEventListener('DOMContentLoaded', function() {
    const itemInput = document.getElementById('itemInput');
    const suggestions = document.getElementById('suggestions');
    const selectedItems = document.getElementById('selectedItems');
    const copyButton = document.getElementById('copyButton');

    const items = [
                "Beef Pho",
                "Chilled Jamaican Papaya Soup",
                "Cream of Broccoli Soup",
                "Cream of Egg Drop Soup",
                "Cream of Lentil",
                "Cream of Mushroom",
                "Cream of Pumpkin",
                "Dhal Shorba Soup",
                "Foccacia Bread",
                "French Onion Soup with Cheese Toast",
                "Garudiya Maldivian Tuna Broth",
                "Italian Minestrone Soup",
                "Koh Samui Soup",
                "Lobster Bisque",
                "Potato Leek Soup",
                "Red Bean Soup",
                "Salmon Bouillabaisse",
                "Seafood Tom Yam",
                "Spinach Egg Noodle Soup",
                "Tom Kha Gai",
                "Vegetable Barley Broth",
                "Vegetable Egg Noodle Soup",
                "Vegetable Minestrone Soup",
                "Vegetable Noodle Soup",
                "Vegetarian Broth",
                "Bakery Basket",
                "Arugula with Balsamic Vinaigrette",
                "Arugula with Parmesa Shavings",
                "Arugula with Parmesan & Avocado Wasabi Dressing",
                "Arugula with Parmesan & Italian Dressing",
                "Assorted Cheese Platter",
                "Baby Spinach with Ranch Dressing",
                "Baby Spinach with Tangerine Dressing",
                "Beetroot Feta Salad",
                "Caesar Salad with Prawns",
                "Carrot Coconut Salad",
                "Chickpeas Salad",
                "Coleslaw",
                "Cucumber Raitha Salad",
                "Homemade Humus & Pita Bread",
                "Mediterranean Greek Vegetable Salad",
                "Mixed Lettuce with Honey Mustard Vinaigrette",
                "Mixed Lettuce with Lemon Vinaigrette",
                "Mixed Lettuce with Mustard Vinaigrette",
                "Mixed Lettuce with Orange Vinaigrette",
                "Mixed Lettuce with Raspberry Vinaigrette",
                "Mixed Lettuce with Tangerine Fressing",
                "Mixed Salad with Avocado Wasabi Dressing",
                "Mixed Salad with Thousand Island Dressing",
                "Orange Broccoli Salad",
                "Pickled Pineapple Salad",
                "Pineapple Malay Pickled Salad",
                "Red Cabbage & Green Apple Salad",
                "Shopska Salad",
                "Shopska Salad with Feta",
                "Three Beans Coriander Salad",
                "Tomato Mozarella Salad",
                "Tuna Niçoise Salad",
                "Rojake Salad",
                "Green Peas Carrot Rice",
                "Local Beef Stew",
                "Kerala Seafood Molly",
                "Cooked Mango Masala",
                "Assorted Vegetables in EVOO",
                "Aubergine Pahi",
                "Baked Rosemary Potatoes",
                "Batter Fried Tiger Prawns with Garlic Mayo",
                "Carrot Bean Coconut Curry",
                "Chicken Fricassé with herb Mayo",
                "Chicken Satay with Penanut Butter Sauce",
                "Crumb Fish Slides with Tartar Sauce",
                "Gratin Dauphinois",
                "Grilled Beef Steak with Blue Cheese",
                "Local Yam Manioc Tempered",
                "Lyonnaise Butternut",
                "Maldivian Tuna Noodles",
                "Mexican Fried Rice",
                "Oriental Vegetable Fried Rice",
                "Pan Fried Chicken Breast with Mushroom Sauce",
                "Pan Fried Grouper Slices with Red Bean Mousse",
                "Pasta Dello Chef",
                "Prawn Fried Rice",
                "Roasted Lemon Oregano Chicken",
                "Roasted Pumpkin with Almon Flakes",
                "Roasted Root Vegetables with EVOO",
                "Sri Lankan Devilled Chicken",
                "Steamed Broccoli in EVOO",
                "Sultan Ghee Rice",
                "Teriyaki Salmon",
                "Vegetable Fried Rice",
                "Yam Manioc Curry",
                "Chicken Enchiladas",
                "Fettuccine with Shrimp",
                "Crumb-Fried Chicken Slices with Garlic Mayo",
                "Stir Fry Bok Choy with Sesame",
                "Chickpeas Masala",
                "Apple Crumble with Vanilla Ice Cream",
                "Chocolate Mousse",
                "Churros with Chocolate Sauce",
                "Cream Caramel",
                "Crème Brulée",
                "Live: Banana Flambée with Coconut Ice Cream",
                "Mahalabia",
                "Mango Panna Cotta",
                "Passion Fruit Cheese Cake",
                "Snow Ginger Cake",
                "Strawberry Pavlova",
                "Tiramisu",
                "Walnut Cheese Cake"
    ];
    let selected = [];

    itemInput.addEventListener('input', function() {
        const query = itemInput.value.toLowerCase();
        displaySuggestions(query);
    });

    itemInput.addEventListener('focus', function() {
        displaySuggestions('');
        suggestions.style.display = 'block'; // Show suggestions when the input field is focused
    });

    itemInput.addEventListener('blur', function() {
        // Delay hiding suggestions to allow click events to register
        setTimeout(() => {
            suggestions.style.display = 'none';
        }, 200);
    });

    function displaySuggestions(query) {
        suggestions.innerHTML = '';
        const filteredItems = items.filter(item => item.toLowerCase().includes(query));
        filteredItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `<input type="checkbox" value="${item}"> ${item}`;
            li.addEventListener('click', function(event) {
                // Ensure the event does not trigger the blur event
                event.stopPropagation();
                const checkbox = li.querySelector('input[type="checkbox"]');
                toggleItem(item, li, checkbox);
                itemInput.value = ''; // Clear the input field when an item is selected
            });
            if (selected.includes(item)) {
                li.querySelector('input[type="checkbox"]').checked = true;
                li.classList.add('selected');
            }
            suggestions.appendChild(li);
        });
    }

    function toggleItem(item, li, checkbox) {
        if (selected.includes(item)) {
            removeItem(item);
            li.classList.remove('selected');
            checkbox.checked = false;
        } else {
            addItem(item);
            li.classList.add('selected');
            checkbox.checked = true;
        }
    }

    function addItem(item) {
        selected.push(item);
        updateSelectedItems();
    }

    function removeItem(item) {
        selected = selected.filter(i => i !== item);
        updateSelectedItems();
    }

    function updateSelectedItems() {
        selectedItems.innerHTML = '';
        selected.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item selected-item';
            li.innerHTML = `${item} <button class="delete-button" style="color: red;">&times;</button>`;
            li.querySelector('.delete-button').addEventListener('click', function() {
                removeItem(item);
                const suggestionItems = Array.from(suggestions.children);
                suggestionItems.forEach(suggestionItem => {
                    if (suggestionItem.textContent.trim() === item) {
                        suggestionItem.querySelector('input[type="checkbox"]').checked = false;
                        suggestionItem.classList.remove('selected');
                    }
                });
            });
            selectedItems.appendChild(li);
        });
    }

    copyButton.addEventListener('click', function() {
        const text = selected.join('\n');
        navigator.clipboard.writeText(text).then(() => {
            alert('List copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });

    // Focus the input field after a short delay
    setTimeout(() => {
        itemInput.focus();
    }, 500);
});
