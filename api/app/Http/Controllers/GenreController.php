<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;

class GenreController extends Controller {
    
    protected $apiKey = "2acae5f11d348efce8b1b72fc68affcc";
    
    public function getGenres() {
        $response = Http::get("https://api.themoviedb.org/3/genre/movie/list?api_key=$this->apiKey&language=fr-FR");
        $jsonData = $response->json();
        return response($jsonData);
    }
}
?>