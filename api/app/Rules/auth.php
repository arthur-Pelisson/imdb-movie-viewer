<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class auth implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value) {
        return $attribute === $value;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message() {
        return 'Les champs mot de passe et confirmation ne coresponde pas';
    }
}
