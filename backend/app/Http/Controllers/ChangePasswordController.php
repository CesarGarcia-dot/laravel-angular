<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use http\Env\Response;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {
        return $this->getPasswordResetTable($request)->count() > 0 ? $this->getChangePassword($request) : $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTable($request)
    {
        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->resetToken
        ]);
    }

    private function tokenNotFoundResponse()
    {
        return response()->json([
            'error' => 'Token or Email is incorrect'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function getChangePassword($request)
    {
        $user = User::whereEmail($request->email)->first();
        $user->update([
            'password' => $request->password
        ]);
        $this->getPasswordResetTable($request)->delete();
        return response()->json([
            'data' => 'Password Successfully Changed'
        ], Response::HTTP_CREATED);
    }
}
