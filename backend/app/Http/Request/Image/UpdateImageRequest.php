<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBoardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'created_at' => 'required|date',
            'user_id' => 'required|exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required.',
            'name.max' => 'Name cannot exceed 255 characters.',
            'created_at.required' => 'Creation date is required.',
            'created_at.date' => 'Creation date must be a valid date.',
            'user_id.required' => 'User is required.',
            'user_id.exists' => 'Selected user does not exist.',
        ];
    }
}
