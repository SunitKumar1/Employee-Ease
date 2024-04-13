package net.java.Ems.services.implementation;

import lombok.AllArgsConstructor;
import net.java.Ems.dto.EmployeeDto;
import net.java.Ems.entity.Employee;
import net.java.Ems.exception.ResourceNotFoundException;
import net.java.Ems.mapper.EmployeeMapper;
import net.java.Ems.repository.EmployeeRepository;
import net.java.Ems.services.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class EmployeeServiceImplementation implements EmployeeService  {

    private EmployeeRepository  employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee =employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeBYId(Long employeeId) {
      Employee employee=  employeeRepository.findById(employeeId)
                .orElseThrow( ()->
                        new ResourceNotFoundException("Employee does not exist with given Id:"+employeeId));

      return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
       List<Employee>employees= employeeRepository.findAll();
        return employees.stream().map((employee )->EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
      Employee employee=  employeeRepository.findById(employeeId).orElseThrow(
                ()->new ResourceNotFoundException("Employee does not exist with given Id:"+employeeId)
        );

      employee.setFirstName(updatedEmployee.getFirstName());
      employee.setLastName(updatedEmployee.getLastName());
      employee.setEmail(updatedEmployee.getEmail());

     Employee updatedEmployeeObj= employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee=  employeeRepository.findById(employeeId).orElseThrow(
                ()->new ResourceNotFoundException("Employee does not exist with given Id:"+employeeId)
        );

        employeeRepository.deleteById(employeeId);
    }
}
