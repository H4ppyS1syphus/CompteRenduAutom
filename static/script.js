let containerCounter = 0; // A counter to assign unique IDs

function addEditableContainer(type, content, isSpecialContent = false) {
    containerCounter++;
    const containerId = `editable-container-${containerCounter}`;
    const container = $('<div class="editable-container" id="' + containerId + '"></div>');

    // Create move up, move down, and close buttons
    const moveUpButton = $('<button class="move-up-btn">↑</button>');
    const moveDownButton = $('<button class="move-down-btn">↓</button>');
    const closeButton = $('<button class="close-btn"></button>');

    let editableElement;
    if (!isSpecialContent) {
        editableElement = $('<' + type + ' contenteditable="true">' + content + '</' + type + 'type>');
    } else {
        if (type === 'Latex') {
            editableElement = $('<' + Latex-js + ' contenteditable="true">' + content + '</' + Latex-js + '>');
        } else {
            // Handle other special content like tables, graphs, etc.
            editableElement = $(content);
        }
    }

    // Add event handlers for buttons
    closeButton.click(function() { container.remove(); });
    moveUpButton.click(function() { container.prev('.editable-container').before(container); });
    moveDownButton.click(function() { container.next('.editable-container').after(container); });

    // Append buttons and the editable element to the container
    container.append(editableElement, closeButton, moveUpButton, moveDownButton);
    $('#content-area').append(container);
}




// Example usage
$(document).ready(function() {
    $('#add-section').click(function() {
        addEditableContainer('h2', 'Section Title');
    });

    // Handler for adding a subtitle
    $('#add-subtitle').click(function() {
        addEditableContainer('h3', 'Subtitle');
    });

    // Handler for adding a paragraph
    $('#add-paragraph').click(function() {
        addEditableContainer('p', 'New paragraph...');
    });
    
});



document.getElementById('toggle-button').addEventListener('click', function() {
    const buttonsContainer = document.querySelector('.buttons');
    const toggleButton = this;
    buttonsContainer.classList.toggle('hidden');

    if (buttonsContainer.classList.contains('hidden')) {
        // Move the toggle button closer to the bottom of the viewport
        this.classList.add('upwards'); // Make the arrow point upwards
        toggleButton.style.bottom = '10px';
    } else {
        // Position the toggle button above the now-visible buttons panel
        this.classList.remove('upwards'); // Make the arrow point downwards
        toggleButton.style.bottom = '90px'; // Adjust this value based on your layout and button panel size
    }
});




function updateLoadingGif() {
    var theme = document.documentElement.getAttribute('theme') || 'light';
    return theme === 'dark' ? '/static/gifs/loading_dark.gif' : '/static/gifs/loading_light.gif';
}

document.getElementById('send-message').addEventListener('click', function() {
    var input = document.getElementById('chat-input');
    var messages = document.getElementById('chat-messages');
    var loadingGifPath = updateLoadingGif(); // Function to get the correct GIF path based on the theme

    if (input.value.trim() === '') {
        alert('Please enter a message.');
        return;
    }

    // Display user's message with spacing
    var userMessage = document.createElement('div');
    userMessage.className = 'message';
    userMessage.innerHTML = "<b>You</b><br>" + input.value;
    messages.appendChild(userMessage);

    // Placeholder for assistant's response with loading GIF
    var assistantMessagePlaceholder = document.createElement('div');
    assistantMessagePlaceholder.className = 'message';
    assistantMessagePlaceholder.innerHTML = "<b>Assistant</b><br><img src='" + loadingGifPath + "' alt='Loading...' class='loading-gif'>";
    messages.appendChild(assistantMessagePlaceholder);

    // Send user message to the server
    $.ajax({
        url: '/get-response',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ message: input.value }),
        success: function() {
            // Check status periodically
            var checkStatus = setInterval(function() {
                $.get('/check-status', function(statusData) {
                    if (statusData.status === 'completed') {
                        clearInterval(checkStatus);
                        assistantMessagePlaceholder.innerHTML = "<b>Assistant</b><br>" + statusData.response; // Update with actual response
                    } else if (statusData.status !== 'in_progress' && statusData.status !== 'queued') {
                        clearInterval(checkStatus);
                        assistantMessagePlaceholder.innerHTML = "<b>Assistant</b><br>Error occurred while processing the message.";
                    }
                });
            }, 1000); // Check every second
        },
        error: function() {
            assistantMessagePlaceholder.innerHTML = "<b>Assistant</b><br>Error occurred while sending message.";
        }
    });

    input.value = '';
});

function addEditableContainerLatex(type, placeholderText) {
    containerCounter++;
    const containerId = `editable-container-${containerCounter}`;
    const container = $('<div class="editable-container" id="' + containerId + '"></div>');

    // Create move up, move down, and close buttons
    const moveUpButton = $('<button class="move-up-btn">↑</button>');
    const moveDownButton = $('<button class="move-down-btn">↓</button>');
    const closeButton = $('<button class="close-btn"></button>');
    const convertButton = $('<button class="latex-btn"><></button>');

    const editableElement = $('<' + type + ' contenteditable="true"></' + type + '>').text(placeholderText);
    
    // Event handler to convert the content to a LaTeX-js element
    convertButton.click(function() {
        const latexContent = editableElement.text();
        const latexElement = $('<latex-js>').text(latexContent);
        editableElement.replaceWith(latexElement);
        convertButton.remove(); // Remove the convert button after conversion
    });

    closeButton.click(function() { container.remove(); });
    moveUpButton.click(function() { container.prev('.editable-container').before(container); });
    moveDownButton.click(function() { container.next('.editable-container').after(container); });

    container.append(editableElement, closeButton, moveUpButton, moveDownButton, convertButton);
    $('#content-area').append(container);
}


// Add event listener for the LaTeX button
document.getElementById('add-latex').addEventListener('click', function() {
    addEditableContainerLatex('p', 'Your LaTeX content here');
});




const toggleSwitch = document.querySelector('.theme-slider input[type="checkbox"]'); 

function switchTheme(e) { 
    if (e.target.checked) { 
        document.documentElement.setAttribute('theme', 'dark'); 
    } else { 
        document.documentElement.setAttribute('theme', 'light'); 
    } 
} 

toggleSwitch.addEventListener('change', switchTheme, false);

document.addEventListener('DOMContentLoaded', function() {
    var addImageButton = document.getElementById('add-image');

    addImageButton.addEventListener('click', function() {
        addEditableContainerImage();
    });

    function addEditableContainerImage() {
        containerCounter++;
        const containerId = `editable-container-${containerCounter}`;
        const container = $('<div class="editable-container" id="' + containerId + '"></div>');

        // Create move up, move down, and close buttons
        const moveUpButton = $('<button class="move-up-btn">↑</button>');
        const moveDownButton = $('<button class="move-down-btn">↓</button>');
        const closeButton = $('<button class="close-btn"></button>');

        // Create a drop zone for images
        const dropZone = createDropZone();

        closeButton.click(function() { container.remove(); });
        moveUpButton.click(function() { container.prev('.editable-container').before(container); });
        moveDownButton.click(function() { container.next('.editable-container').after(container); });

        // Append buttons and drop zone to the container
        container.append(dropZone, closeButton, moveUpButton, moveDownButton);
        $('#content-area').append(container);
    }

    function createDropZone() {
        var dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        addDragDropEvents(dropZone);

        return dropZone;
    }

    function addDragDropEvents(dropZone) {
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.add('drop-zone-hover');
        });

        dropZone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.remove('drop-zone-hover');
        });

        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.remove('drop-zone-hover');

            var files = e.dataTransfer.files;
            handleFiles(files, dropZone);
        });
    }

    function handleFiles(files, dropZone) {
        for (var i = 0, len = files.length; i < len; i++) {
            if (validateImage(files[i])) {
                createImage(files[i], dropZone);
            } else {
                alert('Only images are allowed!');
            }
        }
    }

    function validateImage(image) {
        var validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        return validTypes.indexOf(image.type) !== -1;
    }

    function createImage(file, dropZone) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = new Image();
            img.src = e.target.result;
            img.classList.add('resizable-image'); // Add the resizable-image class
            dropZone.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    var addTableButton = document.getElementById('add-table');
    var modal = document.getElementById('add-table-modal');
    var closeModal = document.getElementsByClassName('close-btn')[0];
    var createTableButton = document.getElementById('create-table-btn');

    addTableButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    createTableButton.addEventListener('click', function() {
        var rows = document.getElementById('table-rows').value;
        var cols = document.getElementById('table-cols').value;

        if (rows > 0 && cols > 0) {
            var tableHTML = createTable(rows, cols).outerHTML;
            addEditableContainer('div', tableHTML, true);
            modal.style.display = 'none'; // Close the modal
        } else {
            alert("Please enter valid numbers for rows and columns.");
        }
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    function createTable(rows, cols) {
        var table = document.createElement('table');
        table.className = 'editable-table';
    
        for (var r = 0; r < rows; r++) {
            var row = table.insertRow();
            for (var c = 0; c < cols; c++) {
                var cell = row.insertCell();
                cell.contentEditable = 'true';
                cell.innerHTML = "Edit";
            }
        }
        return table;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    var addGraphButton = document.getElementById('add-graph');
    var graphModal = document.getElementById('graph-modal'); // Assuming this is the ID of your modal
    var closeGraphModalButton = graphModal.querySelector('.close-modal-button'); // Button to close the modal
    var generateDataButton = graphModal.querySelector('#generate-data'); // Button to generate data inputs
    var submitGraphDataButton = graphModal.querySelector('#submit-graph-data'); // Button to submit graph data

    addGraphButton.addEventListener('click', function() {
        graphModal.style.display = 'block';
    });

    closeGraphModalButton.addEventListener('click', function() {
        graphModal.style.display = 'none';
    });

    generateDataButton.addEventListener('click', function() {
        var numDataPoints = graphModal.querySelector('#num-data-points').value;
        generateDataInputs(numDataPoints);
    });

    submitGraphDataButton.addEventListener('click', function() {
        submitGraphData();
    });

    function generateDataInputs(numDataPoints) {
        var dataInputsContainer = graphModal.querySelector('#data-inputs');
        dataInputsContainer.innerHTML = '';
    
        // Add title, X label, Y label inputs, and linear regression checkbox
        var titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Graph Title';
        titleInput.id = 'graph-title';
        dataInputsContainer.appendChild(titleInput);
    
        var xlabelInput = document.createElement('input');
        xlabelInput.type = 'text';
        xlabelInput.placeholder = 'X-axis Label';
        xlabelInput.id = 'graph-xlabel';
        dataInputsContainer.appendChild(xlabelInput);
    
        var ylabelInput = document.createElement('input');
        ylabelInput.type = 'text';
        ylabelInput.placeholder = 'Y-axis Label';
        ylabelInput.id = 'graph-ylabel';
        dataInputsContainer.appendChild(ylabelInput);
    
        var linearRegressionCheckbox = document.createElement('input');
        linearRegressionCheckbox.type = 'checkbox';
        linearRegressionCheckbox.id = 'graph-linear-regression';
        var linearRegressionLabel = document.createElement('label');
        linearRegressionLabel.textContent = ' Include Linear Regression';
        linearRegressionLabel.insertBefore(linearRegressionCheckbox, linearRegressionLabel.firstChild);
        dataInputsContainer.appendChild(linearRegressionLabel);
    
        for (var i = 0; i < numDataPoints; i++) {
            if (i % 5 === 0) { // Start a new row for every 5 data points
                var xRow = document.createElement('div');
                xRow.className = 'data-input-row';
                var yRow = document.createElement('div');
                yRow.className = 'data-input-row';
                dataInputsContainer.appendChild(xRow);
                dataInputsContainer.appendChild(yRow);
            }
    
            var inputX = document.createElement('input');
            inputX.type = 'number';
            inputX.placeholder = `X${i + 1}`;
            xRow.appendChild(inputX);
    
            var inputY = document.createElement('input');
            inputY.type = 'number';
            inputY.placeholder = `Y${i + 1}`;
            yRow.appendChild(inputY);
        }
    }
    
    
    
    
    
    function submitGraphData() {
        var title = document.getElementById('graph-title').value;
        var xlabel = document.getElementById('graph-xlabel').value;
        var ylabel = document.getElementById('graph-ylabel').value;
        var includeLinearRegression = document.getElementById('graph-linear-regression').checked;
        var data = [];
        
        var xInputs = document.querySelectorAll('.data-input-row:nth-child(odd) input'); // Assuming X inputs are in even rows
        var yInputs = document.querySelectorAll('.data-input-row:nth-child(even) input');  // Assuming Y inputs are in odd rows
    
        for (var i = 0; i < xInputs.length; i++) {
            var x = parseFloat(xInputs[i].value);
            var y = parseFloat(yInputs[i].value);
    
            if (!isNaN(x) && !isNaN(y)) {
                data.push({ y: y, x: x });
            }
        }
    
        if (data.length === 0) {
            alert("Please enter valid numbers for data points.");
            return;
        }
    
        fetch('/plot-graph', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: data,
                title: title,
                xlabel: xlabel,
                ylabel: ylabel,
                includeLinearRegression: includeLinearRegression
            })
        })
        .then(response => response.json())
        .then(data => {
            var img = new Image();
            img.src = data.imageUrl;
        
            // Apply styles to center and improve the appearance
            img.style.display = 'block';   // Makes the image a block element
            img.style.margin = 'auto';     // Centers the image horizontally
            img.style.maxWidth = '90%';    // Limits the image size and ensures it fits within its container
            img.style.border = '1px solid #ddd'; // Optional: adds a border
            img.style.borderRadius = '4px';      // Optional: rounds the corners
            img.style.padding = '5px';           // Optional: adds padding around the image
        

            addEditableContainer('div', img.outerHTML, true);
            graphModal.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error occurred while plotting the graph.');
        });
    }
    
    
});

document.getElementById('generate-HTML').addEventListener('click', async function() {
    // Load the CSS file content dynamically
    const cssFilePath = '/static/Compte_rendu_style.css'; // Adjust the path to your CSS file
    const cssFileContent = await fetch(cssFilePath).then(response => response.text());

    // Clone the lab report element to manipulate without affecting the original
    const labReportElement = document.querySelector('.lab-report').cloneNode(true);

    // Remove all button elements from the cloned lab report
    const buttons = labReportElement.querySelectorAll('button');
    buttons.forEach(button => button.remove());

    // Replace LaTeX-js elements with rendered LaTeX content
    // Note: This part needs adjustment based on how you choose to render LaTeX (MathJax or LaTeX.js)
    const latexElements = labReportElement.querySelectorAll('latex-js');
    latexElements.forEach(el => {
        const latexContent = el.textContent;
        // Example: Replace with an <img> tag or similar that displays the rendered LaTeX
        // Adjust this part based on your LaTeX rendering approach
        const renderedLatex = document.createElement('div');
        renderedLatex.innerHTML = latexContent;
        el.parentNode.replaceChild(renderedLatex, el);
    });

    const labReportHtml = labReportElement.innerHTML;

    // Create a blob with the HTML and the embedded CSS
    const combinedContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Generated Lab Report</title>
                <style>${cssFileContent}</style>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.min.js"></script>
                <script type="module">
                    import { LaTeXJSComponent } from "https://cdn.jsdelivr.net/npm/latex.js/dist/latex.mjs"
                    customElements.define("latex-js", LaTeXJSComponent)
                </script>  
            </head>
            <body>${labReportHtml}</body>
        </html>`;

    const blob = new Blob([combinedContent], { type: 'text/html' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'lab_report.html';
    downloadLink.click();
});



function saveLabReport() {
    var labReportHtml = document.querySelector('.lab-report').innerHTML;
    localStorage.setItem('savedLabReport', labReportHtml);
    alert('Lab report saved!');
}

document.getElementById('save-lab-report').addEventListener('click', saveLabReport);





