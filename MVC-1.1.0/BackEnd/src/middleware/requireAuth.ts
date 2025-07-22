import jwt from 'jsonwebtoken';

interface JwtPayload {
  _id: string;
}

const requireAuth = (req: any, res: any, next: any) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'clave_secreta') as JwtPayload;
    req.userId = decoded._id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = requireAuth;
