<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImagenRequest extends ImagenRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return array_merge($this->validaciones(), [          
            // Reglas de validación
            'imagen' => 'required|image',
        ]);
    }

    public function messages(): array
    {
        return [
            //Reglas personalizadas
            'imagen.required' => 'La imagen es obligatoria',
            'imagen.image' => 'El archivo debe ser una imagen',
        ];
    }
}
