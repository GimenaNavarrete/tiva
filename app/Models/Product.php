<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category(){
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function orderDetails(){
        return $this->hasMany(OrderDetail::class, 'order_detail_id');
    }

    public function productPictures(){
        return $this->hasMany(ProductPicture::class, 'product_picture_id');
    }

    protected $fillable =  ['product', 'is_completed',];
}
