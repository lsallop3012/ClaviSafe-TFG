<?php

namespace App\Services;

use App\Models\Image;

class ImageService
{
    public function list()
    {
        return Image::all();
    }

    public function create(array $data): Image
    {
        $image = Image::create($data);
        return $image;
    }

    public function update(Image $image, array $data): Image
    {
        $image->update($data);
        return $image;
    }

    public function delete(Image $image): void
    {
        $image->delete();
    }
}
