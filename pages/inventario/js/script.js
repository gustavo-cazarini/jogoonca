var options = [];
    
    function addOptionsToSelect(selectId, customOptions) {
    var select = document.getElementById(selectId);

    options.forEach(function(option) {
        var optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        select.appendChild(optionElement);
    });

    customOptions.forEach(function(option) {
        var optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        select.appendChild(optionElement);
    });
    }

    // Adicionando opções personalizadas para format1
    var format1CustomOptions = [
    { value: "ab", label: "ab" },
    { value: "cb", label: "cb" }
    ];
    addOptionsToSelect("format1", format1CustomOptions);

    // Adicionando opções personalizadas para format2
    var format2CustomOptions = [
    { value: "er", label: "er" },
    { value: "yt", label: "yt" }
    ];
    addOptionsToSelect("format2", format2CustomOptions);

    // Adicionando opções personalizadas para format3
    var format3CustomOptions = [
    { value: "12", label: "12" },
    { value: "33", label: "33" }
    ];
    addOptionsToSelect("format3", format3CustomOptions);