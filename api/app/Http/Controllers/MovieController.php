<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;

class MovieController extends Controller {
    
    protected $apiKey = "2acae5f11d348efce8b1b72fc68affcc";
    
    public function movies() {
        $response = Http::get("https://api.themoviedb.org/3/movie/popular?api_key=$this->apiKey&language=fr-FR&page=1&primary_release_date.gte=2022-01-01");
        // clock($response->json());
        // var_dump($response);
        $jsonData = $response->json();
        if (count($jsonData['results']) > 10) {
            $jsonData['results'] = array_slice($jsonData['results'], 10) ;
        }
        return response($jsonData);
    }

    public function searchMovie(Request $request) {
        // clock("Search movie");
        // clock($request->data["title"]);
        $title = $request->data["title"];
        $response = Http::get("https://api.themoviedb.org/3/search/movie?api_key=$this->apiKey&language=fr-FR&page=1&query=$title");
        $jsonData = $response->json();
        return $jsonData;
    }

    public function getMovieById($movieId) {
        
        $response = Http::get("https://api.themoviedb.org/3/movie/$movieId?api_key=$this->apiKey&language=fr-FR");
        $jsonData = $response->json();
        return response()->json(['data' => $jsonData], 200);
    }

    public function getAllMovies($movieId) {
        
        $response = Http::get("http://www.omdbapi.com/?apikey=fc0996f8&i=$movieId");
        return $response->json();
    }
}
?>