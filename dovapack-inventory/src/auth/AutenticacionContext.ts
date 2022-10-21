import React from 'react';
import { claim } from './auth.model';

const AuthContex = React.createContext<{
    claims: claim[];
    update(claims: claim[]): void;
}>({claims: [], update: () => {}});

export default AuthContex;