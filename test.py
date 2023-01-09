def find_indx(arr):
    for i in range(len(arr)):
        if sum(arr[:i+1])==sum(arr[i:]):
            return i
    return -1

# print(find_indx([1,2,3,4,3,2,1] ))
# print(find_indx([1,100,50,-51,1,1] ))
# print(find_indx([20,10,-80,10,10,15,35] ))