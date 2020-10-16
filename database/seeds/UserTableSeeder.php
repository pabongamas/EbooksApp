<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;
use App\Curso;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_docente = Role::where('name', 'docente')->first();
        $role_admin = Role::where('name', 'admin')->first();
        $role_estudiante = Role::where('name', 'estudiante')->first();
        $curso_estudiante=Curso::where('name','curso1')->first();
        


        $user = new User();
        $user->name = 'Docente';
        $user->email = 'docente@example.com';
        $user->password = bcrypt('secret');
        $user->save();
        $user->roles()->attach($role_docente);

        $user = new User();
        $user->name = 'Docente 2';
        $user->email = 'docente2@example.com';
        $user->password = bcrypt('secret');
        $user->save();
        $user->roles()->attach($role_docente);

        $user = new User();
        $user->name = 'Admin';
        $user->email = 'admin@example.com';
        $user->password = bcrypt('secret');
        $user->save();
        $user->roles()->attach($role_admin);


        $user = new User();
        $user->name = 'Estudiante';
        $user->email = 'estudiante@example.com';
        $user->password = bcrypt('secret');
        $user->save();
        $user->roles()->attach($role_estudiante);


        $user = new User();
        $user->name = 'Estudiante con curso';
        $user->email = 'estudiantico@example.com';
        $user->password = bcrypt('secret');
        $user->save();
        $user->cursos()->attach($curso_estudiante);
    }
}
