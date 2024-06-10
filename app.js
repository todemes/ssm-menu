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
            "Arugula with Balsamic Dressing",
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
            "Mixed Lettuce with Honey Mustard Dressing",
            "Mixed Lettuce with Lemon Dressing",
            "Mixed Lettuce with Mustard Dressing",
            "Mixed Lettuce with Orange Dressing",
            "Mixed Lettuce with Raspberry Dressing",
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
            "Assorted Vegetables in EVOO",
            "Aubergine Pahi",
            "Baked Rosemary Potatoes",
            "Batter Fried Tiger Prawns with Garlic Mayo",
            "Carrot Bean Coconut Curry",
            "Chicken Fricassé with herb Mayo",
            "Chicken Satay with Penanut Butter Sauce",
            "Crumbed Fish Slides with Tartar Sauce",
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
            "Walnut Cheese Cake",
        ];
    let selected = [];

    itemInput.addEventListener('input', function() {
        const query = itemInput.value.toLowerCase();
        displaySuggestions(query);
    });

    itemInput.addEventListener('focus', function() {
        displaySuggestions('');
    });

    function displaySuggestions(query) {
    suggestions.innerHTML = '';
    const filteredItems = items.filter(item => item.toLowerCase().includes(query));
    filteredItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<input type="checkbox" value="${item}"> ${item}`;
        suggestions.appendChild(li);
    });
}

    suggestions.addEventListener('change', function(event) {
        const checkbox = event.target;
        if (checkbox.checked) {
            addItem(checkbox.value);
        } else {
            removeItem(checkbox.value);
        }
    });

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
            li.className = 'list-group-item';
            li.textContent = item;
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
