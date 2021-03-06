import jwt from 'jsonwebtoken';

export default class Token {

    private static seed: string = 'app-secret';
    private static expiration: string = '1d';

    static getJwtToken(payload: any): string {
        return jwt.sign({ user: payload }, this.seed, { expiresIn: this.expiration });
    }

    static verifyToken(userToken: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    reject();
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}