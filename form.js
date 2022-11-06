// Hàm validator
Validator = (options) => {
    // Lấy element form cần validate
    var formElement = document.querySelector(options.form)

    formElement.onsubmit = (e) => {
        e.preventDefault();
        //
        options.rules.forEach((rule) => {
        var inputElement = formElement.querySelector(rule.selector)
        validate(inputElement, rule)


    })
        // Hien thi
        var formInputs = formElement.querySelectorAll('.selectInput')
        var formValues = Array.from(formInputs).reduce((accumulator, currentValue) => {
            accumulator[currentValue.id] = currentValue.value
            return accumulator
        }, {})

        options.onSubmit(formValues)
    }


    validate = (inputElement, rule) => {
        var errorMessage = rule.check(inputElement.value) 
        var errorElement = inputElement.parentElement.querySelector('.form_message')
        if(errorMessage !== undefined) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        }
        else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }


    if(formElement !== undefined) {
        options.rules.forEach((rule) => {
            var inputElement = formElement.querySelector(rule.selector)
            inputElement.onblur = () => {
                validate(inputElement, rule)
            } 
        })
    } 
}

// Định nghĩa rules

isRequired = (selector, message) => {
    return {
        selector: selector,
        check(value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}

isEmail = (selector) => {
    return {
        selector,
        check(value) {
            var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

            return regex.test(value) ? undefined : 'Trường này phải là email'
        }
    };
}

isPassword = (selector, min) => {
    return {
        selector,
        check(value) {
            return value.length >= min ? undefined : `Password phải lớn hơn ${min} kí tự`
        }
    };
}

isConfirmed = (selector, getConfirmValue,message) => {
    return {
        selector: selector,
        check(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập không chính xác'
        }
    }
}