def verify_password(password): 
    if parola == parola_corecta:
        print("You're logged in!")
        return True
    elif len(parola) < 4 or len(parola) > 10:
        print("Password needs to be in range 4-10")
    else:
        print("Wrong password")
    return False
    
parola_corecta = "parola_corecta"
tries = 3

while tries > 0:
    parola = input("Enter a password: ")
    if verify_password(parola) == True:
        print("You're logged in!")
        break
    else:
        tries = tries-1
        print("You have " + str(tries) + " tries")



