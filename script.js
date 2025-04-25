const min_credit_amount = 5000; // Minimum credit amount for which calculation is allowed

const max_credit_amount = 500000; // Maximum credit amount for which calculation is allowed

const interest_rate = 6.3; // Interest rate of 

const max_interest_rate = 18.5 // Maximum interest rate for which calculation is allowed

const max_years = 30; // Maximum duration of credit

const currency_units = 'zł' // Your currency 

document.addEventListener('DOMContentLoaded', () => {

    // Displaying currency units in input field

    const currency_units_span = document.getElementById('credit-recalculate-currency-units');

    currency_units_span.textContent = currency_units;

    // Credit amount - user input check

    const input_amount = document.getElementById('recalculate-credit-user-amount');

    input_amount.addEventListener('blur', () => {

        const value = input_amount.value;

        let numerical_value = parseFloat(value.replace(',', '.'));

        if(!isNaN(numerical_value)){

            input_amount.value = value;

        } else {

            input_amount.value = "";

        }

    });

    // Interest rate - user input check

    const input_interest_rate = document.getElementById('recalculate-interest-rate');

    input_interest_rate.addEventListener('blur', () => {

        const value = input_interest_rate.value;

        let numerical_value = parseFloat(value.replace(',', '.'));

        if(!isNaN(numerical_value)){

            input_interest_rate.value = value;

        } else {

            input_interest_rate.value = "";

        }

    });

    // Credit duration - initial setting of select fields

    // Days

    const day_input = document.getElementById('credit-recalculate-day');

    for(let day = 1; day <= 31; day++){

        const option = document.createElement('option');

        if(day < 10){

            day = "0" + day;

        }

        option.value = day;

        option.textContent = day;

        day_input.appendChild(option);

    }

    // Months

    const month_input = document.getElementById('credit-recalculate-month');

    for(let month = 1; month <= 12; month++){

        const option = document.createElement('option');

        if(month < 10){

            month = "0" + month;

        }

        option.value = month;

        option.textContent = month;

        month_input.appendChild(option);

    }

    // Years

    const year_input = document.getElementById('credit-recalculate-year');

    const current_year = new Date().getFullYear();

    for(let year = current_year + 1; year <= current_year + max_years; year++){

        const option = document.createElement('option');

        option.value = year;

        option.textContent = year;

        year_input.appendChild(option);

    }

    // Excluding days in shorter months

    const shorter_months = ["04", "06", "09", "11"];

    month_input.addEventListener('change', () => {

        const day_value = day_input.value;

        const month_value = month_input.value;

        // If selected month is February removing 29, 30 and 31

        if(month_value === "02"){

            day_input.remove(31);

            day_input.remove(30);

            day_input.remove(29);

            // If currently selected day is either 29, 30 or 31 change it to 28

            if(day_value === "31" || day_value === "30" || day_value === "29"){

                day_input.value = "28";

            }

        // If selected month is shorter adding days 29 and 30(if removed earlier) and removing day 31

        } else if(shorter_months.includes(month_value)){

            if(!day_input.options[29]){

                const option = document.createElement('option');

                option.value = 29;

                option.textContent = 29;

                day_input.appendChild(option);

            }

            if(!day_input.options[30]){

                const option = document.createElement('option');

                option.value = 30;

                option.textContent = 30;

                day_input.appendChild(option);

            }

            if(day_input.options[31]){

                day_input.remove(31);

            }

            // If currently selected day is 31 change it to 30

            if(day_value === "31"){

                day_input.value = "30";

            }

        // If selected month is longer then we add days that might have been removed earlier

        } else {

            if(!day_input.options[29]){

                const option = document.createElement('option');

                option.value = 29;

                option.textContent = 29;

                day_input.appendChild(option);

            }

            if(!day_input.options[30]){

                const option = document.createElement('option');

                option.value = 30;

                option.textContent = 30;

                day_input.appendChild(option);

            }

            if(!day_input.options[31]){

                const option = document.createElement('option');

                option.value = 31;

                option.textContent = 31;

                day_input.appendChild(option);

            }

        }

    });

});

// Credit recalculation

function recalculateCredit(){

    // Form inputs

    const input_amount = document.getElementById('recalculate-credit-user-amount');

    const input_interest_rate = document.getElementById('recalculate-interest-rate');

    const day_input = document.getElementById('credit-recalculate-day');

    const month_input = document.getElementById('credit-recalculate-month');

    const year_input = document.getElementById('credit-recalculate-year');

    const period_container = document.getElementById('credit-recalculate-container-input');

    // Getting current values

    const input_amount_value = input_amount.value !== "" ? parseFloat(input_amount.value.replace(',', '.')) : "";

    const input_interest_rate_value = input_interest_rate.value !== "" ? parseFloat(input_interest_rate.value.replace(',', '.')) : "";

    const day_input_value = day_input.value;

    const month_input_value = month_input.value;

    const year_input_value = year_input.value;

    // Errors

    const amount_error = document.getElementById('user-amount-error');

    const interest_rate_error = document.getElementById('user-interest-rate-error');

    const credit_period_error = document.getElementById('user-credit-period-error');

    const recalculate_error = document.getElementById('recalculate-credit-error-message');

    recalculate_error.innerHTML = "";

    // Check if input values are correct

    let amount_error_message = null;

    // Credit amount

    if(input_amount_value === ""){

        amount_error_message = "please enter credit amount";

    } else {

        if(input_amount_value < min_credit_amount){

            amount_error_message = "minimum credit amount is " + min_credit_amount + " " + currency_units;

        } 

        if(input_amount_value > max_credit_amount){

            amount_error_message = "maximum credit amount is " + max_credit_amount + " " + currency_units;

        } 

    }

    if(amount_error_message){

        amount_error.innerHTML = amount_error_message;

        input_amount.style.borderColor = "#FF0000";

    } else {

        amount_error.innerHTML = "";

        input_amount.style.borderColor = "#979797";

    }

    // Interest rate

    let interest_rate_error_message = null;

    if(input_interest_rate_value === ""){

        interest_rate_error_message = "please enter interest rate";

    } else {

        if(input_interest_rate_value > max_interest_rate){

            interest_rate_error_message = "interest rate can't exceed " + max_interest_rate + " %";

        }

    }

    if(interest_rate_error_message){

        interest_rate_error.innerHTML = interest_rate_error_message;

        input_interest_rate.style.borderColor = "#FF0000";

    } else {

        interest_rate_error.innerHTML = "";

        input_interest_rate.style.borderColor = "#979797";

    }

    // Credit duration

    let credit_period_error_message = null;

    if(day_input_value === "" || month_input_value === "" || year_input_value === ""){

        credit_period_error_message = "please enter full loan end date";

        credit_period_error.innerHTML = credit_period_error_message;

        period_container.style.borderColor = "#FF0000";

    } else {

        credit_period_error.innerHTML = "";

        period_container.style.borderColor = "#979797";

    }

    // Show results of recalculation - if no errors were found

    if(!amount_error_message && !interest_rate_error_message && !credit_period_error_message){

        // If user credit interest rate is lower than our offer

        if(input_interest_rate_value <= interest_rate){

            recalculate_error.innerHTML = "Sorry, there is no better offer.";

        } else {

            const old_installment_container = document.getElementById('credit-recalculate-old-installment-visual');

            const new_installment_container = document.getElementById('credit-recalculate-new-installment-visual');

            old_installment_container.style.transition = "none";

            old_installment_container.style.height = "0";

            new_installment_container.style.transition = "none";

            new_installment_container.style.height = "0";

            recalculate_error.innerHTML = "";

            const credit_amount = input_amount_value;

            const current_interest_rate = input_interest_rate_value;

            const end_date =  year_input_value + "-" + month_input_value + "-" + day_input_value;

            const display_date = day_input_value + "/" + month_input_value + "/" + year_input_value;

            // Data summary for user

            document.getElementById('recalculated-total-credit').innerHTML = credit_amount + " " + currency_units;

            document.getElementById('recalculated-interest-rate').innerHTML = interest_rate + " %";

            document.getElementById('recalculated-credit-finish').innerHTML = display_date;

            const now = new Date();

            const endDate = new Date(end_date);

            // Calculating number of installments left

            let total_installments = (endDate.getFullYear() - now.getFullYear()) * 12 + (endDate.getMonth() - now.getMonth());

            if(now.getDate() < endDate.getDate()){

                total_installments++;

            }

            // Recalculating credits

            const current_monthly_installment = calculateEMI(credit_amount, current_interest_rate, total_installments);

            const recalculated_monthly_installment = calculateEMI(credit_amount, interest_rate, total_installments);

            // Calculating savings

            const monthly_savings = Math.round(current_monthly_installment) - Math.round(recalculated_monthly_installment);

            const yearly_savings = total_installments > 12 ? monthly_savings * 12 : monthly_savings * total_installments;

            const total_savings = monthly_savings * total_installments;

            // Animations

            animateCounter("credit-recalculate-old-installment-value", current_monthly_installment);

            animateCounter("credit-recalculate-new-installment-value", recalculated_monthly_installment);

            animateCounter("credit-recalculate-savings-monthly", monthly_savings);

            animateCounter("credit-recalculate-savings-yearly", yearly_savings);

            animateCounter("credit-recalculate-savings-total", total_savings);

            // Results

            const result_container = document.getElementById('credit-recalculate-results-outer-container');

            const outer_result_container = document.getElementById('credit-recalculate-inner-right-container');

            result_container.style.visibility = 'visible';

            outer_result_container.style.display = 'flex';

            const anchor = document.getElementById('credit-recalculate-anchor-element');

            const height_percentage = Math.round((recalculated_monthly_installment/current_monthly_installment)*200);

            const calculated_height = height_percentage + "px";

            setTimeout(() => {

                old_installment_container.style.transition = "height 1.4s ease";

                old_installment_container.style.height = "200px";

                new_installment_container.style.transition = "height 1.4s ease";

                new_installment_container.style.height = height_percentage + "px";

                anchor.scrollIntoView({ behavior: "smooth" });

            }, 100);

        }

    }

}

// Calculate installment

function calculateEMI(amount, rate, installments){

    const r = rate / 12 / 100;

    const emi = (amount * r * Math.pow(1 + r, installments)) / (Math.pow(1 + r, installments) - 1);

    return emi;

}

// Animation of element

function animateCounter(element_id, target_value, duration = 1500){

    const element = document.getElementById(element_id);

    const startTime = performance.now();

    function update(currentTime){

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(progress * target_value);              

        element.textContent = currentValue.toLocaleString('pl-PL') + " " + currency_units;

        if(progress < 1){

            requestAnimationFrame(update);

        } else {

            element.textContent = (Math.round(target_value)).toLocaleString('pl-PL') + " " + currency_units;

        }

    }

    requestAnimationFrame(update);

}