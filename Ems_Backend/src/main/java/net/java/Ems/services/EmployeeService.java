package net.java.Ems.services;

import net.java.Ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeBYId(Long employeeId);

    List<EmployeeDto>getAllEmployees();

    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee);

    void deleteEmployee(Long employeeId);

}
