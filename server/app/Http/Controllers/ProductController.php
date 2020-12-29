<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Validator;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index()
    {
        $products = DB::table('products')->paginate(3);

        return response()->json(['products' => $products]);
    }

    public function indexByPriceUp()
    {
        $products = DB::table('products')->orderBy('price')->paginate(3);

        return response()->json(['products' => $products]);
    }

    public function indexByPriceDown()
    {
        $products = DB::table('products')->orderBy('price', 'DESC')->paginate(3);

        return response()->json(['products' => $products]);
    }
     
    public function store(Request $request)
    {
        $validate=Validator::make($request->all(),
        [
            'name'=>'required|unique:products',
            'description'=>'min:5|max:100',
            'price'=>'required',
        ],
        [
            'name.required'=>'Поле имя является обязательным',
            'description.min'=>'Поле описание должно быть минимум 5 символов',
            'description.max'=>'Поле описание должно быть не более 100 символов'
        ]);

        if($validate->fails()) {
            return response()->json(['errors'=>$validate->errors()], 201);
        }
        return Product::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product=Product::find($id);
        return response()->json([$product], 201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function edit($id)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $product -> update($request->all());
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Product::destroy($id);
    }
}
