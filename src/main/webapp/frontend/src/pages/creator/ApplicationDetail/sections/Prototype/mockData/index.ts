import { PrototypeSection, ValidationResponse } from '../types';
import { tableData } from './tableData';
import { metricsData } from './metricsData';
import { cardGridData } from './cardGridData';
import { kanbanData } from './kanbanData';

export const mockSections: PrototypeSection[] = [
  tableData,
  metricsData,
  cardGridData,
  kanbanData,
];

export const getValidationResponse = (sectionId: string, feedback: string): ValidationResponse => {
  const section = mockSections.flatMap(s => s.sections).find(s => s.id === sectionId);
  
  if (!section) {
    return {
      isValid: false,
      message: 'Section not found',
      validationCode: 'DATA_MODEL'
    };
  }

  if (section.validations?.dataModel === false) {
    return {
      isValid: false,
      message: 'This change cannot be implemented due to current data model limitations',
      validationCode: 'DATA_MODEL'
    };
  }

  if (section.validations?.businessLogic === false) {
    return {
      isValid: false,
      message: 'This change violates existing business logic rules',
      validationCode: 'BUSINESS_LOGIC'
    };
  }

  return {
    isValid: true,
    message: 'Feedback accepted and will be implemented',
    validationCode: 'SUCCESS'
  };
}; 