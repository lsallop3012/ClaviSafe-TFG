<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Enums\RoleSlug;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'provider',
        'google_sub',
        'avatar',
        'bio',
        'email_verified_at',
    ];

    protected $appends = ['role'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function getRoleAttribute(): ?string
    {
        if (array_key_exists('role', $this->relations)) {
            $slug = $this->relations['role']?->slug;
        } else {
            $slug = $this->role()->first()?->slug;
        }
        if ($slug instanceof \App\Enums\RoleSlug) return $slug->value;
        return $slug;
    }

    public function boards()
    {
        return $this->hasMany(Board::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    // public function saveImages()
    // {
    //     return $this->hasMany(SaveImage::class);
    // }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function isAdmin(): bool
    {
        return $this->getRoleAttribute() === RoleSlug::ADMIN->value;
    }

    public function isUser(): bool
    {
        return $this->getRoleAttribute() === RoleSlug::USER->value;
    }
}
