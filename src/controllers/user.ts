import { Request, Response } from 'express';
import { registerNewUser, loginUser } from '../services/auth';
import { getAUser, getAllUsers } from '../services/user';

const getAllUsersCtrl = async (req: Request, res: Response) => {
  try {
    const responseUsers = await getAllUsers();
    res.send(responseUsers);
  } catch (e) {
    res.status(500).json({ erro: 'Server Error' });
  }
};

const getUserCtrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getAUser(id);
    console.log('response', response);
    res.send(response);
  } catch (e) {
    res.status(500).json({ erro: 'Server Error' });
  }
};

export { getAllUsersCtrl, getUserCtrl };
