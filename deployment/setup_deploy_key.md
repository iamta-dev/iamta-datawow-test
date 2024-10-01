# Setting Up a Deploy Key for Read-Only Access to a GitHub Repository

This guide will help you create and configure a deploy key for read-only access to your GitHub repository.

## 1. Generate an SSH Key Pair

Run the following command on your server or local machine to generate a new SSH key pair:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/deploy_key
```

## 2. Copy the Public Key
```sh
cat ~/.ssh/deploy_key.pub
```

## 3. Add the Public Key to Your GitHub Repository
- Go to your repository on GitHub.
- Navigate to Settings > Deploy keys.
- Click Add deploy key.
- Provide a title for the key.
- Paste the public key content into the Key field.
- Ensure "Allow write access" is not checked (for read-only access).
- Click Add key.

4. Configure SSH on Your Server
```sh
cd .ssh
eval "$(ssh-agent -s)"
chmod 600 deploy_key*
ssh-add deploy_key
```

5. Clone or Pull the Repository
```sh
git clone git@github.com:username/repository.git
```
