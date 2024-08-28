<?PHP


class GeneralController {

    static public function formatoSalida($code, $dato){
        $resp = [
            "status" => $code,
            "message" => $dato
        ];

        return json_encode($resp, JSON_PRETTY_PRINT);
    }

}