# %% Run Functions below to initiate
def loadRefs():
    # Description: Loads the app by clicking through relevant tiles
    # with initialising references of the relevant excels and drivers

    global McdStores
    global McdProds
    global driver

    # Load Mcd Stores from Excel
    McdStores = pd.read_excel (r"C:\\Users\\kripu.khadka\\OneDrive - Competitive Foods Australia Pty Ltd\Desktop\\mcd scraper\\Mcd App.XLSX", \
        sheet_name='Stores')
    McdStores.head()

    # Load Mcd Products
    McdProds = pd.read_excel (r"C:\\Users\\kripu.khadka\\OneDrive - Competitive Foods Australia Pty Ltd\Desktop\\mcd scraper\\Mcd App.XLSX", \
        sheet_name='All')
    McdProds.head()
    
    # Load device properties -> equivalent to Appium
    desired_cap = {
    "deviceName": "Android Emulator",
    "platformName": "Android",
    "appPackage": "com.mcdonalds.au.gma",
    "appActivity": "com.mcdonalds.mcdcoreapp.common.activity.SplashActivity"
    #  "appWaitActivity": "com.mcdonalds.mcdcoreapp.tutorial.activity.TutorialPagerActivity",
    #  "appWaitPackage": "com.mcdonalds.au.gma"
    }
    
    driver = webdriver.Remote("http://localhost:4723/wd/hub",desired_cap)
    driver.implicitly_wait(100)
    ##press allow
    # WebDriverWait(driver, 45).until(EC.presence_of_element_located((By.ID, "com.android.permissioncontroller:id/permission_allow_button")))
    # driver.find_element_by_id("com.android.permissioncontroller:id/permission_allow_button").click()
    ### log in 
    driver.find_element_by_id("com.mcdonalds.au.gma:id/login").click()
    time.sleep(2)

    driver.find_element_by_id("com.mcdonalds.au.gma:id/email_phone").send_keys('JohnathonCarter88@cfal.com.au')
    #driver.find_element_by_id("com.mcdonalds.au.gma:id/email_phone").send_keys('loharir960@era7mail.com')
    
    time.sleep(2)
    driver.find_element_by_id("com.mcdonalds.au.gma:id/password").send_keys('Tomato43')
    time.sleep(2)
    driver.find_element_by_id("com.mcdonalds.au.gma:id/save").click()
    #next
    time.sleep(2)
    # driver.find_element_by_id("com.mcdonalds.au.gma:id/next_button_layout").click()
    #start order
    time.sleep(2)
    driver.find_element_by_id("com.mcdonalds.au.gma:id/text_left_button").click()
    #open setting  
    time.sleep(2)
    driver.find_element_by_id("com.mcdonalds.au.gma:id/btn_share_my_location").click()


    #always allow timer set to 10s to opt as per the internet connecti
    time.sleep(10)

    # WebDriverWait(driver, 45).until(EC.presence_of_element_located((By.ID, "com.android.permissioncontroller:id/permission_allow_always_button")))
    # driver.find_element_by_id("com.android.permissioncontroller:id/permission_allow_always_button").click()
    # driver.findElement(MobileBy.id("com.android.packageinstaller:id/permission_allow_button")).click();



    driver.find_element_by_id("com.android.packageinstaller:id/permission_allow_button").click()
    #goback
    time.sleep(3)
    driver.back()

# def openFavs():
#     # Description: Open Favourites list fFrom the home screen, accesses the favourites section

#     #press more
#     driver.find_element_by_xpath('//android.widget.FrameLayout[@content-desc="More tab 5 of 5"]/android.widget.ImageView').click()
#     #press locations
#     driver.find_element_by_xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.support.v7.widget.RecyclerView/android.widget.LinearLayout[3]/android.widget.TextView').click()
#     #favs
#     driver.find_element_by_xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout[2]/android.view.ViewGroup/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.HorizontalScrollView/android.widget.LinearLayout/android.support.v7.app.ActionBar.Tab[2]').click()
#     #expand
#     driver.find_element_by_xpath('//android.widget.RelativeLayout[@content-desc="View expanded store list"]/android.widget.ImageView').click()

def refreshFilesList():
    # Description: The list housed in the directory, to check if store has been scraped
    # if the file exists in the directory, e.g. 3001_HOBART

    global filesrun
    filesrun = []
   
    #get list of files that have been run error in line no 90 with file path 
    os.listdir(r"C:\\Users\\kripu.khadka\\OneDrive - Competitive Foods Australia Pty Ltd\\Desktop\\mcd scraper\\StoreFiles")

    for i in os.listdir(r"C:\\Users\\kripu.khadka\\OneDrive - Competitive Foods Australia Pty Ltd\\Desktop\\mcd scraper\\StoreFiles"):
        # print(i.rstrip(i[-5:]))
        filesrun.append((i.rstrip(i[-5:])))
    print("Files from folder has been read")

def checkStoreName():
    # Description: Parses the store address to check if the store has been scraped
    
    global curStoreName 
    global doesexist
   
    getID(curStoreName)  # get the store id from address in the fav list.

    # is current store in list (TRUE OR FALSE)
    doesexist = storeid in filesrun

def getID(curStoreName):
    # Description: From the store address, returns the store name frmo the Store List Excel

    global storeid, mcStore
    for m in range(len(McdStores)):
        #print(m)
        #print(McdStores['McD Address'][m])
        if curStoreName == McdStores['McD Address'][m]:            
            storeid = McdStores['ID'][m]
            print(McdStores['ID'][m], " @ ",  McdStores['McD Address'][m])
            mcStore = storeid

def scrollstore():
    # Description: In the favourites list, scrolls the store using moving elements

    element_to_tap = driver.find_element_by_xpath('(//android.widget.TextView[@content-desc="View details, button"])[2]') 
    element_to_drag_to = driver.find_element_by_xpath('(//android.widget.TextView[@content-desc="View details, button"])[1]') 
    driver.scroll(element_to_tap, element_to_drag_to)

def findProd(mcProd, mcAppSearch, mcTile, mcType, mcSize):
    # Description:

    driver.find_element_by_id("com.mcdonalds.au.gma:id/product_search_input").click()
    driver.find_element_by_id("com.mcdonalds.au.gma:id/product_search_input").send_keys(mcAppSearch)
    ## press search on keyboard
    driver.execute_script('mobile: performEditorAction', {'action': 'search'})
    time.sleep(2)
    driver.back()

def scrapeprod(mcStore, storedeets):
    # Description: 

    # set up lists
    global mcProd
    global mcSize

    for mcs in range(len(McdProds)):
        try:
            #print(mcs)
            mcProd = McdProds['Mcd Product'][mcs]
            mcAppSearch = McdProds['App Search'][mcs]
            mcTile = McdProds['Tile'][mcs]
            mcType = McdProds['Type'][mcs]
            mcSize = McdProds['Size'][mcs]

            print(mcProd, mcAppSearch, mcTile, mcType, mcSize + "|start - scrapeprod function")

            #find product....
            time.sleep(2)

            findProd(mcProd, mcAppSearch, mcTile, mcType, mcSize)

            time.sleep(2)
            try:
                isAvailable = driver.find_element_by_xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[1]/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[1]').get_attribute("text")
            except:
                time.sleep(3)
                driver.back()
                isAvailable = 'Currently unavailable'

            if isAvailable != 'Currently unavailable':
                #carry on
                if mcType == 0:
                    print("scrapeprod -- Doing type 0 -- standard but loop")
                    print(mcStore,"|", storedeets)

                    standardProd(mcProd, mcAppSearch, mcTile, mcType, mcSize, mcStore, storedeets)
                    
                if mcType == 1:
                    print("scrapeprod -- Doing type 1 -- standard")
                    print(mcStore,"|", storedeets)
                    
                    standardProd(mcProd, mcAppSearch, mcTile, mcType, mcSize, mcStore, storedeets)
                    
                elif mcType == 2 :
                    print(" -- Doing type 2 -- sizable")
                    sizableProd(mcProd, mcAppSearch, mcTile, mcType, mcSize, mcStore, storedeets)
                
                ##close       
                #driver.find_element_by_id("com.mcdonalds.au.gma:id/slide_back").click()

                itemfound = "Yes Item Scraped"
            else:
                #next prod
                itemfound = "Item Not avaiable "

            time.sleep(2)

            print(mcProd + itemfound +  "|finish - scrapeprod function")
            print('______________________________________________________________')

        except NameError:
            print(mcProd + "|error")
            with open(r"C:\\Users\\kripu.khadka\\OneDrive - Competitive Foods Australia Pty Ltd\Desktop\\mcd scraper\\StoreFiles\\failed.txt", "a") as myfile:
            #with open("McAppScrapeFailed.txt", "a") as myfile:
                myfile.write((str(mcStore, storedeets, mcProd, mcAppSearch, mcTile, mcType, mcSize) + ' |failed')+ "\n")

def mcChick(mcStore, mcProd, storedeets):
    # Description: Created for McChicken product as there are some inconsitencies where
    # mchicken can sometimes be on tile 3 or 4 and not in view
    
    global eval_item
    
    eval_item = ""
    for i in range(4):
        while eval_item != 'McChicken':  
            i = i + 1
            try:   
                type0Prod(i) #eval_item comes this function
                print(i, eval_item)  
                
                if eval_item == 'McChicken':

                    driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[" + str(i) + "]/android.widget.LinearLayout/android.widget.ImageView").click()
            except:
                pass # doing nothing on exception
                print("error")

def standardProd(mcProd, mcAppSearch, mcTile, mcType, mcSize, mcStore, storedeets):
    # Description:

    global eval_item

    eval_item = ''
    try:
        if mcTile == 1:
            print(mcTile)
            driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[1]/android.widget.LinearLayout/android.widget.ImageView").click()
        elif mcTile ==2 :
            print(mcTile)
            driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[2]/android.widget.LinearLayout/android.widget.ImageView").click()
        
        elif mcProd == 'MC CHICKEN ALA CARTE':
            print('ideally run via a function...but for now hard coded')
            time.sleep(2)
            
            eval_item = ""
            for i in range(4):
                while eval_item != 'McChicken':  
                    i = i + 1
                    try:   
                        type0Prod(i) #eval_item comes this function
                        print(i, eval_item)  
                        
                        if eval_item == 'McChicken':

                            driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[" + str(i) + "]/android.widget.LinearLayout/android.widget.ImageView").click()
                    except:
                        pass # doing nothing on exception
                        print("error finding mcchicken ALA CARTE ")

        elif mcProd == 'MC CHICKEN MEDIUM VALUE MEAL':
            print('ideally run via a function...but for now hard coded')
            
            for i in range(4):
                while eval_item != 'McChicken':  
                    i = i + 1
                    try:   
                        type0Prod(i) #eval_item comes this function
                        print(i, eval_item)  
                        
                        if eval_item == 'McChicken':

                            driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[" + str(i) + "]/android.widget.LinearLayout/android.widget.ImageView").click()
                    except:
                        pass # doing nothing on exception
                        print("error finding mcchicken Value ")


        elif mcProd == 'CHEESE BURGER ALA CARTE':
            print('ideally run via a function...but for now hard coded')
            marker = 0 
            for i in range(4):
                while eval_item != 'Cheeseburger' and marker != 1:  
                    i = i + 1
                    try:   
                        type0Prod(i) #eval_item comes this function
                        print(i, eval_item)  
                        
                        if eval_item == 'Cheeseburger':
                            marker = 1  #mark as done
                            driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[" + str(i) + "]/android.widget.LinearLayout/android.widget.ImageView").click()
                    except:
                        pass # doing nothing on exception
                        print("error finding Cheeseburger ALA Carte ")


        elif mcProd == 'CHEESEBURGER KIDS MEAL':
            print('ideally run via a function...but for now hard coded')
            
            
            for i in range(4):
                while eval_item != 'Cheeseburger Happy Meal':  
                    i = i + 1
                    try:   
                        type0Prod(i) #eval_item comes this function
                        print(i, eval_item)  
                        
                        if eval_item == 'Cheeseburger Happy Meal':
                            
                            driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[" + str(i) + "]/android.widget.LinearLayout/android.widget.ImageView").click()
                    except:
                        pass # doing nothing on exception
                        print("error finding Cheeseburger Happy Meal ")


    ### capture product details price for Ala Carte or Value Meal

        if mcSize == 'A':
            item = driver.find_element_by_id("com.mcdonalds.au.gma:id/order_item_cal").get_attribute("text")
        elif mcSize =='V' :
            item = driver.find_element_by_id("com.mcdonalds.au.gma:id/order_meal_cal").get_attribute("text")
        elif mcSize =='S' :  # for cheese burger , ham cheese toastie meal , bottled water , mcflurry
            item = driver.find_element_by_id("com.mcdonalds.au.gma:id/product_details").get_attribute("text")

        print(mcSize, item)

        myprodname = mcSize + "" + item
        prodnames.append(mcProd +"|" + myprodname)
        stores.append(mcStore  +"|" +  storedeets)
        time.sleep(2)
        driver.back()

    except:
        print('Error at standard Prod at ' + mcProd + '|' + mcStore)
        time.sleep(2)
        driver.back()
        
def sizableProd(mcProd, mcAppSearch, mcTile, mcType, mcSize, mcStore, storedeets):
    # Description:

    #actions = TouchAction(driver)
    #actions.press(x= 379, y=594).move_to(x=379, y=78).release().perform()

    if mcTile == 1:
        driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[1]/android.widget.LinearLayout/android.widget.ImageView").click()
    elif mcTile ==2 :
        driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[2]/android.widget.LinearLayout/android.widget.ImageView").click()
    elif mcTile ==3 :
        driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[3]/android.widget.LinearLayout/android.widget.ImageView").click()

    if mcSize == "S":
        ####################  small 
        try:
            # itemname = driver.find_element_by_id("com.mcdonalds.au.gma:id/product_name").get_attribute("text")
            item = driver.find_element_by_id("com.mcdonalds.au.gma:id/product_details").get_attribute("text")
            print(mcSize, item)

            myprodname = mcSize + "" + item
            prodnames.append(mcProd + "|" +myprodname)
            stores.append(mcStore  + "|" +  storedeets)
        except:
            print("Failed at: " + mcStore + "|" + mcProd + "|" +myprodname)

    elif mcSize == "M" :
        try:
            ####################   medium
            #enable size selector
            driver.find_element_by_id("com.mcdonalds.au.gma:id/size_tv").click()
            ##medium
            driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.NumberPicker/android.widget.Button").click()
            #save
            driver.find_element_by_id("com.mcdonalds.au.gma:id/tvDone").click()

            # itemname = driver.find_element_by_id("com.mcdonalds.au.gma:id/product_name").get_attribute("text")
            item = driver.find_element_by_id("com.mcdonalds.au.gma:id/product_details").get_attribute("text")
            print(mcSize, item)

            myprodname = mcSize + "" + item
            prodnames.append(mcProd + "|" +myprodname)
            stores.append(mcStore  + "|" +  storedeets)
        except:
            print("Failed at: " + mcStore + "|" + mcProd + "|" +myprodname)
        
    elif mcSize =="L" :
        try:
            ####################    large
            #enable size selector
            driver.find_element_by_id("com.mcdonalds.au.gma:id/size_tv").click()
            ##medium
            driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.NumberPicker/android.widget.Button").click()        
            ##large
            driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.NumberPicker/android.widget.Button[2]").click()
            #save
            driver.find_element_by_id("com.mcdonalds.au.gma:id/tvDone").click()

            # itemname = driver.find_element_by_id("com.mcdonalds.au.gma:id/product_name").get_attribute("text")
            item = driver.find_element_by_id("com.mcdonalds.au.gma:id/product_details").get_attribute("text")
            print(mcSize, item)
            myprodname = mcSize + "" + item
            prodnames.append(mcProd + "|" +myprodname)
            stores.append(mcStore  + "|" +  storedeets)
        except:
            print("Failed at: " + mcStore + "|" + mcProd +"|" +myprodname)
    ##close
    driver.back()
    
def checkPageSource(searchstr):
    # Description:
    
    ### check which type of product it is Sizeable or Standard
    global prodtype

    soup = BeautifulSoup(driver.page_source, 'lxml')
    if int(str(soup).find(searchstr)) > 0:
        #print("Standard")
        prodtype = "Standard"
    else:
        #print("Sizeable")
        prodtype = "Sizeable"

def type0Prod(i):
    # Description:

    global eval_item

    driver.find_element_by_xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout[" + str(i) + "]/android.widget.LinearLayout/android.widget.ImageView").click()
    time.sleep(1)

    ##check the prod type.....

    checkPageSource("Get Item")

    if prodtype == "Standard":
        print("Standard")
        driver.find_element_by_id("com.mcdonalds.au.gma:id/order_item_cal").click()
        time.sleep(1)
        eval_item = driver.find_element_by_id("com.mcdonalds.au.gma:id/product_name").get_attribute("text")
        print(eval_item)
        time.sleep(1)
        driver.back()   

    else:
        print("Sizeable")
        eval_item = driver.find_element_by_id("com.mcdonalds.au.gma:id/product_name").get_attribute("text")
        print(eval_item)
        time.sleep(1)
        driver.back()   

print("Function Load Complete.")
print('______________________________________________________________')

# %% Load App

import requests
import lxml.html
import re
import pandas as pd 

from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException    
from appium.webdriver.common.touch_action import TouchAction

import os 
cwd = os.getcwd() 
cwd

import time
from appium import webdriver
from selenium.webdriver.common.keys import Keys

import datetime

print(datetime.datetime.now())

curStoreAddress = ""

loadRefs()

print("App Loaded Successfully")

# %% Favouriting Stores

refreshFilesList()

print("Initiating Favouriting Stores Module")

# Open Order
driver.find_element_by_xpath('//android.widget.FrameLayout[@content-desc="More tab 5 of 5"]/android.widget.ImageView').click()
#press locations
driver.find_element_by_xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.support.v7.widget.RecyclerView/android.widget.LinearLayout[3]/android.widget.TextView').click()
#expand
driver.find_element_by_xpath('//android.widget.RelativeLayout[@content-desc="View expanded store list"]/android.widget.ImageView').click()

failedstore = []
failedaddress = []
storecount = 0

# Loop for stores in Excel
for i in range(len(McdStores)-1,-1,-1):

# Maccas App can only favourite a maximum of 25 stores at one time
    if storecount != 25:

        idexist = McdStores['ID'][i] in filesrun

        if idexist == True:
            print(McdStores['ID'][i] + " has already been scraped")
        else:
            driver.find_element_by_id("com.mcdonalds.au.gma:id/toolbar_search").click()
            driver.find_element_by_id("com.mcdonalds.au.gma:id/search_text").clear()
            driver.find_element_by_id("com.mcdonalds.au.gma:id/search_text").send_keys(McdStores['McD Address'][i])
            driver.find_element_by_id("com.mcdonalds.au.gma:id/search_text").click()
            driver.execute_script('mobile: performEditorAction', {'action': 'search'})
            time.sleep(2)

            # Loop through first 4 search results
            m=0
            found=0
            for m in range(4):
                m = m+1
                # View Details
                try:
                    driver.find_element_by_xpath('(//android.widget.TextView[@content-desc="View details, button"])['+ str(m) +']').click()
                except:
                    try:
                        driver.find_element_by_xpath('//android.widget.TextView[@content-desc="View details, button"]').click()
                    except:
                        break
                        print(McdStores['ID'][i] + " failed.")
                        failedstore.append(McdStores['ID'][i])
                        failedaddress.append(McdStores['McD Address'][i])
                        driver.back()
                time.sleep(1)

                curStoreAddress = driver.find_element_by_id("com.mcdonalds.au.gma:id/address_line_one").get_attribute("text")

                if curStoreAddress.find(McdStores['McD Address'][i]) != -1:
                    # Favourite
                    driver.find_element_by_id('com.mcdonalds.au.gma:id/tv').click()
                    storecount += 1
                    found=1
                    print(str(storecount) + '. ' + McdStores['ID'][i] + " favourited at Address: " + curStoreAddress)
                    driver.back()
                    break
                else:
                    driver.back()

            if found==0:
                print(McdStores['ID'][i] + " failed.")
                failedstore.append(McdStores['ID'][i])
                failedaddress.append(McdStores['McD Address'][i])
    
    else:
        break

driver.back()

zippedList =  list(zip(failedstore, failedaddress))

df = pd.DataFrame(list(zip(failedstore,failedaddress )), 
            columns =['Store', 'Address']) 

df.to_excel(r"C:\\Users\\kripu.khadka\\OneDrive - Competitive Foods Australia Pty Ltd\Desktop\\mcd scraper\sourceTwo" + datetime.date.today().strftime("%d%m%y") + ".xlsx", sheet_name="Failed_Favs")

print('Favourite Stores Module Complete.')
print('______________________________________________________________')

# %% Scrape Stores

import requests
import lxml.html
import re

import pandas as pd 

from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException    
from appium.webdriver.common.touch_action import TouchAction

import os 
cwd = os.getcwd() 
cwd

import time
from appium import webdriver
from selenium.webdriver.common.keys import Keys

import datetime

print(datetime.datetime.now())

curStoreAddress = ""
curStoreName = ""
laststore = "184-190 Main Road"

loadRefs()
print("App Loaded Successfully")
openFavs()
refreshFilesList()
print('______________________________________________________________')

while curStoreName != laststore:   ### <------  this should reflect the last favourite store
    
    prodnames=[]
    stores = []
    mcdAddresses = []

    ## capture name of store and storedeets
    for i in range(4):

        i = i + 1

        driver.find_element_by_xpath('(//android.widget.TextView[@content-desc="View details, button"])['+ str(i) +']').click() 
        time.sleep(1)
        curStoreName = driver.find_element_by_id("com.mcdonalds.au.gma:id/address_line_one").get_attribute("text")
        store_address = driver.find_element_by_id("com.mcdonalds.au.gma:id/address_line_two").get_attribute("text")
        store_time = driver.find_element_by_id("com.mcdonalds.au.gma:id/store_timing").get_attribute("text")
        storedeets = store_address + "|" + store_time
        time.sleep(1)
        print(storedeets)
        print(curStoreName)
        time.sleep(0.5)
        
        ## check if the store has been scraped
        checkStoreName()  
        
        if doesexist == True:
            
            print(storeid + ' has been scraped..moving onto next')
            driver.back()
            time.sleep(1)
            mcdAddresses.append(curStoreName)
            scrollstore()
            print('______________________________________________________________')   

        else:
            
            print(storeid + ' needs to be scraped')
            
            #press order from list
            driver.find_element_by_id("com.mcdonalds.au.gma:id/order_here").click()
            # WebDriverWait(driver,5).until(EC.presence_of_element_located((By.ID, 'com.mcdonalds.au.gma:id/categories_header_mobile_ordering_text')))
            # driver.find_element_by_id("com.mcdonalds.au.gma:id/categories_header_mobile_ordering_text").click()
            WebDriverWait(driver, 40).until(EC.presence_of_element_located((By.ID, 'com.mcdonalds.au.gma:id/product_search_input')))
            
            print('run scrape prod with ', storeid, "__", curStoreName)
            
            print(datetime.datetime.now(), " start")

            scrapeprod(storeid, curStoreName)

            ### output file
            zippedList =  list(zip(stores, prodnames))

            df = pd.DataFrame(list(zip(stores,prodnames )), 
                        columns =['Store', 'Prodnames']) 

            df.to_excel("\\\HJASYDSVR01\\operations\\CFAL\\accountants\\Financials\\Kai\\202002 - Appium\\StoreFiles\\" + storeid + ".xlsx", sheet_name=storeid)
            df.drop(df.index, inplace=True)
            driver.back()
            time.sleep(1)

            # refresh file list as new file created
            refreshFilesList()
            time.sleep(1)

            # open fav list
            openFavs()
            time.sleep(1)

# %% Unfavourite Stores Module
loadRefs()
openFavs()

try:
    while curStoreName != laststore:   ### <------  this should reflect the last favourite store
        
        unfavstores = []

        ## capture name of store and storedeets
        for i in range(4):

            i = i + 1

            driver.find_element_by_xpath('(//android.widget.TextView[@content-desc="View details, button"])['+ str(i) +']').click() 
            time.sleep(1)
            curStoreName = driver.find_element_by_id("com.mcdonalds.au.gma:id/address_line_one").get_attribute("text")
            
            storeexist = curStoreName in unfavstores

            if storeexist == True:
                
                driver.back()
                time.sleep(1)
                scrollstore()

            else:
                
                driver.find_element_by_id('com.mcdonalds.au.gma:id/icon').click()
                unfavstores.append(curStoreName)
                driver.back()

except:
    print("Automatic unfavouriting completed, check favourites list")
    print('______________________________________________________________')

# %%{
# 
# 
# }
