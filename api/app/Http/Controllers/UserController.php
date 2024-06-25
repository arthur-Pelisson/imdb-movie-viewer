<?php

namespace App\Http\Controllers;

use App\User;
use App\Favoris;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\MovieController;

class UserController extends Controller {
    
    public function addFavoris(Request $request) {
        $userId = Auth::user()->id;
        $validator = Validator::make($request->all(), [
            'movieId' => 'required|string',
        ]);


        if ($validator->fails()) {
            return response()->json(['message' => "Il y'a heu une erreur pendant l'ajout de votre film vaforis"], 400);
        }

        $favoris = Auth::user()->favoris;
        //return mesage erro if id already belong to user 
        foreach ($favoris as $key => $value) {
            if ($favoris[$key]->movieId == $request->movieId) {
                return response()->json(['message' => "Ce film et deja dans la liste de vos favoris"], 400);
            } 
        }

        $favoris = new Favoris([
            'movieId' => $request->movieId,
            'user_id' => $userId
        ]);

        $favoris->save();
        return response()->json(['message' => "Le film a bien ete ajouter a vos favoris"], 200);

    }

    public function getFavoris() {
         $favoris = Auth::user()->favoris->toArray();
         $response = [];
         foreach ($favoris as $key => $value) {
            $movieId = $favoris[$key]['movieId'];
            $callApiMovie = new MovieController();
            $movieResponse = $callApiMovie->getAllMovies($movieId);
            array_push($response, $movieResponse);
         }
        return response()->json(['data' => $response], 200);
    }
}
