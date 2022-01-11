import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { config } from '../utils/config_init'
import { User, UserClass } from '../models/user'
import roles from './roles'
import { ErrorAPI } from '../utils/errors'
import { IQueryInfo } from 'accesscontrol'

const user = new UserClass()

interface JwtPayload {
  user: User
}

export const authenticate = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res.status(401).send({
      error: 'Missing username or password for authentication.'
    })
  }
  const u = await user
    .authenticate(req.body.username, req.body.password)
    .catch((err) => {
      throw new ErrorAPI('Service Error', err)
    })
  if (!u) {
    return res.status(401).send({
      error: 'The username or password provided is invalid.'
    })
  }

  const token = jwt.sign({ user: u }, config.secret)
  res.json(token)
}

export const grant_profile = function (action: string, resource: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const q: IQueryInfo =
        req.user?.id === parseInt(req.params.id)
          ? {
              role: req.user?.role,
              action: action.replace('any', 'own'),
              resource: resource
            }
          : {
              role: req.user?.role,
              action: action,
              resource: resource
            }

      const permission = roles.permission(q)
      if (!permission.granted) {
        return res.status(401).send({
          error: "You don't have enough permission to perform this action"
        })
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}

export const grant = function (action: string, resource: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const q: IQueryInfo = {
        role: req.user?.role,
        action: action,
        resource: resource
      }

      const permission = roles.permission(q)
      if (!permission.granted) {
        return res.status(401).send({
          error: "You don't have enough permission to perform this action"
        })
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}

export const verify_auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const authorizationHeader = req.headers.authorization
      const token = authorizationHeader.split(' ')[1]
      const decoded = jwt.verify(token, config.secret) as JwtPayload
      req.user = decoded.user
      next()
    } else {
      return res.status(401).send({
        error: 'Invalid or missing authentication credentials on request.'
      })
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return res.status(401).send({
        error: 'An invalid token used on request.'
      })
    }
    next(err)
  }
}
