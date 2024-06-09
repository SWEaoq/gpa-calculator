function addCourse() {
    const courseDiv = document.createElement('div');
    courseDiv.classList.add('course');

    const courseName = document.createElement('input');
    courseName.classList.add('input-field');
    courseName.placeholder = 'Course Name';
    courseDiv.appendChild(courseName);

    const courseCredits = document.createElement('input');
    courseCredits.classList.add('input-field');
    courseCredits.placeholder = 'Credits';
    courseCredits.type = 'number';
    courseCredits.min = '0';
    courseDiv.appendChild(courseCredits);

    const courseGrade = document.createElement('input');
    courseGrade.classList.add('input-field');
    courseGrade.placeholder = 'Grade';
    courseGrade.type = 'text';
    courseDiv.appendChild(courseGrade);

    document.getElementById('courses').appendChild(courseDiv);
}

function calculateGPA() {
    const courses = document.getElementsByClassName('course');
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < courses.length; i++) {
        const courseCredits = courses[i].getElementsByTagName('input')[1].value;
        const courseGrade = courses[i].getElementsByTagName('input')[2].value.toUpperCase();

        const credits = parseFloat(courseCredits);
        const grade = gradeToPoint(courseGrade);

        if (!isNaN(credits) && grade !== null) {
            totalCredits += credits;
            totalPoints += credits * grade;
        }
    }

    const gpa = totalPoints / totalCredits;
    document.getElementById('result').innerText = 'Your GPA is: ' + gpa.toFixed(2);
}

function gradeToPoint(grade) {
    switch (grade) {
        case 'A+': return 5.0;
        case 'A': return 4.75;
        case 'B+': return 4.5;
        case 'B': return 4.0;
        case 'C+': return 3.5;
        case 'C': return 3.0;
        case 'D+': return 2.5;
        case 'D': return 2.0;
        case 'F': return 0.0;
        default: return null;
    }
}

function saveUserData() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter your name');
        return;
    }

    const courses = document.getElementsByClassName('course');
    const userData = [];

    for (let i = 0; i < courses.length; i++) {
        const courseName = courses[i].getElementsByTagName('input')[0].value;
        const courseCredits = courses[i].getElementsByTagName('input')[1].value;
        const courseGrade = courses[i].getElementsByTagName('input')[2].value;

        if (courseName && courseCredits && courseGrade) {
            userData.push({
                name: courseName,
                credits: courseCredits,
                grade: courseGrade
            });
        }
    }

    localStorage.setItem(username, JSON.stringify(userData));
    alert('Data saved successfully');
}

function loadUserData() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter your name');
        return;
    }

    const userData = localStorage.getItem(username);
    if (!userData) {
        alert('No data found for this user');
        return;
    }

    const courses = JSON.parse(userData);
    document.getElementById('courses').innerHTML = '';

    courses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course');

        const courseName = document.createElement('input');
        courseName.classList.add('input-field');
        courseName.placeholder = 'Course Name';
        courseName.value = course.name;
        courseDiv.appendChild(courseName);

        const courseCredits = document.createElement('input');
        courseCredits.classList.add('input-field');
        courseCredits.placeholder = 'Credits';
        courseCredits.type = 'number';
        courseCredits.min = '0';
        courseCredits.value = course.credits;
        courseDiv.appendChild(courseCredits);

        const courseGrade = document.createElement('input');
        courseGrade.classList.add('input-field');
        courseGrade.placeholder = 'Grade';
        courseGrade.type = 'text';
        courseGrade.value = course.grade;
        courseDiv.appendChild(courseGrade);

        document.getElementById('courses').appendChild(courseDiv);
    });
}
