Q. Why we made those 2 classes in utils?

We are using plugins:
1. mongooseAggregatePaginate
2. bcrypt / bcrypt-js
3. jwt

We will use jwt and bcrypt in user file because we want to encrypt our passwords.
Direct encryption is not possible so we need middleware hooks (pre, post)

Refresh Token is stored in database