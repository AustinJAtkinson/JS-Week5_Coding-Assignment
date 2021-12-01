class Employee {
    constructor (name, jobtitle){
        this.name = name;
        this.jobtitle = jobtitle;
    }
}

class Department{
    constructor(departmentName){
        this.departmentName = departmentName;
        this.employees = [];
    }

    hireEmployee(employee){
        if(employee instanceof Employee){
            this.employees.push(employee)
        }else{
            throw new Error(`Invalid Employee format ${employee}`)
        }
    }
}

class Company{
    constructor(){
        this.departments = [];
        this.selectedDepartment = null;
    }

    start(){
        let selection = this.showCompanyDirectory()

        while( selection != 0){
            switch (selection){
                case '1':
                    this.addDepartment();
                    break;
                case '2':
                    this.viewDepartment();
                    break;
                case '3':
                    this.removeDepartment();
                    break;
                case '4':
                    this.viewCompanyDepartments();
                    break;
                default:
                    selection =  0;
            }
            selection = this.showCompanyDirectory();
        }
        alert('Goodbye');
    }

    showCompanyDirectory(){
        return prompt(`
        0) close
        1) Add Department
        2) View Department
        3) Remove Department
        4) View Company Departments
        `);
    }

    showDepartmentOptions(departmentInfo){
        return prompt(`
${departmentInfo}
-----------------
0) back
1) Hire Employee
2) Fire Employee
`)
    }

    addDepartment(){
        const department = prompt('Enter new department name:');
        this.departments.push(new Department(department));
    }

    removeDepartment(){
        const index = prompt('Enter the index department index you wish to remove:');
        if(index > -1 && index < this.departments.length) this.departments.splice(index, 1)
    }
    
    viewDepartment(){
        const index = prompt('Enter the index of the Department you wish to access:');
        if(index > -1 && index < this.departments.length){
            this.selectedDepartment = this.departments[index];
            let description  = `Department ${this.selectedDepartment.departmentName}\n`;
            
            let i = 0
            for( let employee of this.selectedDepartment.employees){
                description += `${i}) ${employee.name} - ${employee.jobtitle}\n`;
                i++;
            }
            let selection = this.showDepartmentOptions(description);
            switch (selection){
                case '1':
                    this.hireEmployee()
                    break;
                case '2':
                    this.fireEmployee()
            }
        }
    }
    hireEmployee(){
        const name = prompt('What is the name of the new employee?');
        const jobTitle = prompt(`What is the Job title for ${name}?`);
        this.selectedDepartment.employees.push(new Employee(name, jobTitle));
    }
    fireEmployee(){
        const index = prompt('What is the index of the employee you wish to fire?');
        if(index > -1 && index < this.selectedDepartment.employees.length){
            this.selectedDepartment.employees.splice(index, 1)
        }
    }

    viewCompanyDepartments(){
        let departments = ""
        for (let i = 0; i < this.departments.length; i++) {
            departments += `${i}) ${this.departments[i].departmentName}\n`
        }
        alert(departments);
    }
}

let company = new Company();

company.start();