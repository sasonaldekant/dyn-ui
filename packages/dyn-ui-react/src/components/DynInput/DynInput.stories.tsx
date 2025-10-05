/**
 * DynInput Storybook Stories
 * Part of DYN UI Form Components Group - SCOPE 6
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { DynInput } from './DynInput';
import { MASK_PATTERNS } from '../../hooks/useDynMask';
import type { ValidationRule } from '../../types/field.types';

const meta: Meta<typeof DynInput> = {
  title: 'Form/DynInput',
  component: DynInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Advanced input component with validation, masking, and clean functionality. Supports various input types, custom validation rules, and input masking patterns.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type'
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Input size variant'
    },
    mask: {
      control: 'select',
      options: [undefined, ...Object.values(MASK_PATTERNS)],
      description: 'Input mask pattern'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input'
    },
    readonly: {
      control: 'boolean',
      description: 'Make input read-only'
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required'
    },
    showCleanButton: {
      control: 'boolean',
      description: 'Show clear button when input has value'
    },
    onChange: {
      action: 'changed',
      description: 'Called when input value changes'
    },
    onFocus: {
      action: 'focused',
      description: 'Called when input gains focus'
    },
    onBlur: {
      action: 'blurred',
      description: 'Called when input loses focus'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic input examples
export const Default: Story = {
  args: {
    label: 'Nome completo',
    placeholder: 'Digite seu nome completo',
    help: 'Este campo é usado para identificação'
  }
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'usuario@exemplo.com',
    help: 'Seu endereço de email principal'
  }
};

export const Required: Story = {
  args: {
    label: 'Campo obrigatório',
    placeholder: 'Este campo é obrigatório',
    required: true,
    help: 'Este campo deve ser preenchido'
  }
};

export const Optional: Story = {
  args: {
    label: 'Campo opcional',
    placeholder: 'Este campo é opcional',
    optional: true,
    help: 'Este campo pode ficar vazio'
  }
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'email-invalido',
    errorMessage: 'Formato de email inválido',
    help: 'Digite um email válido'
  }
};

// Size variants
export const SmallSize: Story = {
  args: {
    label: 'Input pequeno',
    size: 'small',
    placeholder: 'Tamanho pequeno'
  }
};

export const LargeSize: Story = {
  args: {
    label: 'Input grande',
    size: 'large',
    placeholder: 'Tamanho grande'
  }
};

// With icon
export const WithIcon: Story = {
  args: {
    label: 'Buscar',
    icon: 'dyn-icon-search',
    placeholder: 'Digite para buscar',
    showCleanButton: true
  }
};

// Input types
export const PasswordInput: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: 'Digite sua senha',
    required: true
  }
};

export const NumberInput: Story = {
  args: {
    label: 'Idade',
    type: 'number',
    placeholder: '18',
    min: 0,
    max: 120
  }
};

export const TelInput: Story = {
  args: {
    label: 'Telefone',
    type: 'tel',
    mask: MASK_PATTERNS.phone,
    placeholder: '(11) 9999-9999'
  }
};

// Masked inputs
export const PhoneMask: Story = {
  args: {
    label: 'Telefone',
    mask: MASK_PATTERNS.phone,
    placeholder: '(11) 9999-9999',
    help: 'Formato: (XX) XXXX-XXXX'
  }
};

export const CPFMask: Story = {
  args: {
    label: 'CPF',
    mask: MASK_PATTERNS.cpf,
    placeholder: '000.000.000-00',
    help: 'Formato: XXX.XXX.XXX-XX'
  }
};

export const CreditCardMask: Story = {
  args: {
    label: 'Cartão de Crédito',
    mask: MASK_PATTERNS.creditCard,
    placeholder: '0000 0000 0000 0000',
    help: 'Formato: XXXX XXXX XXXX XXXX'
  }
};

// States
export const Disabled: Story = {
  args: {
    label: 'Campo desabilitado',
    value: 'Este campo está desabilitado',
    disabled: true,
    help: 'Este campo não pode ser editado'
  }
};

export const ReadOnly: Story = {
  args: {
    label: 'Campo somente leitura',
    value: 'Este campo é somente leitura',
    readonly: true,
    help: 'Este campo não pode ser alterado'
  }
};

// Validation examples
export const WithValidation: Story = {
  args: {
    label: 'Email com validação',
    type: 'email',
    required: true,
    validation: [
      {
        type: 'email',
        message: 'Digite um email válido'
      },
      {
        type: 'minLength',
        value: 5,
        message: 'Email deve ter pelo menos 5 caracteres'
      }
    ] as ValidationRule[],
    placeholder: 'exemplo@email.com',
    help: 'Digite um email válido com pelo menos 5 caracteres'
  }
};

export const WithCustomValidation: Story = {
  args: {
    label: 'Nome de usuário',
    validation: [
      {
        type: 'custom',
        message: 'Nome de usuário deve começar com letra',
        validator: (value: string) => /^[a-zA-Z]/.test(value)
      },
      {
        type: 'minLength',
        value: 3,
        message: 'Mínimo 3 caracteres'
      },
      {
        type: 'maxLength',
        value: 20,
        message: 'Máximo 20 caracteres'
      }
    ] as ValidationRule[],
    placeholder: 'usuario123',
    help: 'Deve começar com letra, ter entre 3 e 20 caracteres'
  }
};

// Interactive examples
export const Playground: Story = {
  args: {
    label: 'Input playground',
    placeholder: 'Digite aqui para testar',
    help: 'Use os controles para testar diferentes configurações',
    showCleanButton: true
  }
};
